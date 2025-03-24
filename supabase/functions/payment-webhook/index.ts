
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import * as crypto from "https://deno.land/std@0.178.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get the signature from the headers
    const signature = req.headers.get("x-paystack-signature");
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Missing signature" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    const paystackSecret = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecret) {
      throw new Error("Paystack secret key not configured");
    }
    
    // Get the request body
    const body = await req.text();
    
    // Verify the signature
    const encoder = new TextEncoder();
    const data = encoder.encode(body);
    const key = encoder.encode(paystackSecret);
    const hmac = await crypto.subtle.importKey(
      "raw",
      key,
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign"]
    );
    
    const signature_bytes = await crypto.subtle.sign("HMAC", hmac, data);
    const hash = Array.from(new Uint8Array(signature_bytes))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    if (hash !== signature) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid signature" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Parse the webhook payload
    const payload = JSON.parse(body);
    const { event, data } = payload;
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Extract the order ID from metadata
    const orderId = data.metadata?.order_id;
    if (!orderId) {
      throw new Error("Order ID not found in webhook payload");
    }
    
    // Process the webhook event based on the event type
    switch (event) {
      case "charge.success":
        // Update order status to paid
        await supabase.rpc("update_order_status", {
          p_order_id: orderId,
          p_status: "paid",
          p_notes: `Payment successful. Reference: ${data.reference}, Amount: ${data.amount / 100}`
        });
        
        // Trigger email notification about successful payment
        await sendOrderConfirmationEmail(supabase, orderId);
        
        break;
      
      case "charge.failed":
        // Update order with failed payment event
        await supabase
          .from("order_events")
          .insert({
            order_id: orderId,
            status: "payment_failed",
            notes: `Payment failed. Reference: ${data.reference}, Reason: ${data.gateway_response || "Unknown"}`
          });
        
        break;
        
      default:
        console.log(`Unhandled webhook event: ${event}`);
    }
    
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// Helper function to send order confirmation email
async function sendOrderConfirmationEmail(supabase, orderId) {
  try {
    // Fetch order details including user email
    const { data: order, error } = await supabase
      .from("orders")
      .select(`
        *,
        profiles(email, full_name),
        order_items(
          *,
          products(name, image_urls)
        ),
        shipping_addresses(*)
      `)
      .eq("id", orderId)
      .single();
    
    if (error || !order) {
      throw new Error(`Failed to fetch order details: ${error?.message || "Order not found"}`);
    }
    
    // Call email notification function
    await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({
        template: "order-confirmation",
        to: order.profiles.email,
        subject: `Your Eksejabula Order #${orderId.substring(0, 8)} is Confirmed`,
        data: {
          order_id: orderId,
          customer_name: order.profiles.full_name,
          order_items: order.order_items,
          shipping_address: order.shipping_addresses[0],
          total_amount: order.total_price,
          order_date: new Date(order.created_at).toLocaleDateString(),
        }
      }),
    });
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    // Don't throw so webhook still succeeds
  }
}
