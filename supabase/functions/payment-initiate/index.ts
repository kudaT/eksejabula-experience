
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentRequest {
  orderId: string;
  amount: number;
  email: string;
  reference?: string;
  callbackUrl: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, amount, email, reference, callbackUrl } = await req.json() as PaymentRequest;
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Validate order exists and belongs to user before proceeding
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*, profiles(email)")
      .eq("id", orderId)
      .single();
    
    if (orderError || !order) {
      console.error("Order validation error:", orderError);
      return new Response(
        JSON.stringify({ error: "Order not found or not authorized" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Initialize Paystack transaction
    const paystackKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackKey) {
      throw new Error("Paystack secret key not configured");
    }
    
    // Generate a reference if one wasn't provided
    const paymentReference = reference || `EKS-${orderId.substring(0, 8)}-${Date.now()}`;
    
    // Create Paystack initialization request
    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${paystackKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        amount: amount * 100, // Paystack amount is in kobo (x100)
        reference: paymentReference,
        callback_url: callbackUrl,
        metadata: {
          order_id: orderId,
          custom_fields: [
            {
              display_name: "Order ID",
              variable_name: "order_id",
              value: orderId,
            }
          ]
        }
      }),
    });
    
    const paystackData = await paystackResponse.json();
    
    if (!paystackResponse.ok) {
      console.error("Paystack error:", paystackData);
      throw new Error(`Paystack API error: ${paystackData.message}`);
    }
    
    // Store payment reference in an order event
    await supabase
      .from("order_events")
      .insert({
        order_id: orderId,
        status: "payment_initiated",
        notes: `Payment initiated with reference: ${paymentReference}`,
        created_by: order.user_id,
      });
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: paystackData.data,
        order_id: orderId 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Payment initiation error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
