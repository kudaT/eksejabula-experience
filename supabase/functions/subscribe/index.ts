
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { email } = await req.json();
    
    if (!email || typeof email !== "string") {
      throw new Error("Valid email is required");
    }
    
    console.log(`Processing subscription for email: ${email}`);
    
    // First store the subscriber in the database
    const { data: existingSubscriber, error: checkError } = await supabase
      .from("subscribers")
      .select("*")
      .eq("email", email)
      .single();
      
    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking for existing subscriber:", checkError);
      throw new Error("Database error while checking subscription");
    }
    
    // If subscriber doesn't exist, add them
    if (!existingSubscriber) {
      const { error: insertError } = await supabase
        .from("subscribers")
        .insert([{ email, confirmed: true }]);
        
      if (insertError) {
        console.error("Error inserting subscriber:", insertError);
        throw new Error("Failed to save subscription");
      }
      
      console.log("Subscriber added to database successfully");
    } else {
      console.log("Subscriber already exists in database");
    }
    
    // Configure SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: "eksejabula.co.za",
        port: 465,
        tls: true,
        auth: {
          username: "info@eksejabula.co.za",
          password: Deno.env.get("SMTP_PASSWORD") || "kw]qV%PP{*#t",
        },
      }
    });
    
    // Send welcome email to the subscriber
    try {
      await client.send({
        from: "Eksejabula <info@eksejabula.co.za>",
        to: email,
        subject: "Welcome to the Eksejabula Community!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333; font-size: 24px;">Welcome to Eksejabula!</h1>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              Thank you for subscribing to our newsletter. You'll now receive updates about our latest products, 
              exclusive offers, and creative inspiration.
            </p>
            <p style="font-size: 16px; line-height: 1.5; color: #555;">
              We're excited to have you join our community!
            </p>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="font-size: 14px; color: #888;">
                Follow us on social media:
                <br>
                <a href="https://www.instagram.com/eksejabula?igsh=cndqOW8zczNwdTM4&utm_source=qr" style="color: #555; text-decoration: none;">Instagram</a> | 
                <a href="https://www.facebook.com/share/1AGxyQ2obK/?mibextid=wwXIfr" style="color: #555; text-decoration: none;">Facebook</a> | 
                <a href="https://x.com/eksejabula?s=21" style="color: #555; text-decoration: none;">Twitter</a> |
                <a href="https://www.tiktok.com/@ekse.jabula?_t=ZM-8u6y2cuyzi9&_r=1" style="color: #555; text-decoration: none;">TikTok</a>
              </p>
            </div>
          </div>
        `,
      });
      
      console.log("Welcome email sent successfully");
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
      // We'll continue even if email fails, as the subscription was saved
    }
    
    // Send notification to admin
    try {
      await client.send({
        from: "Eksejabula Website <info@eksejabula.co.za>",
        to: "info@eksejabula.co.za",
        subject: "New Newsletter Subscriber",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">New Newsletter Subscriber</h2>
            <p style="font-size: 16px; color: #555;">
              A new user has subscribed to the newsletter:
            </p>
            <p style="font-size: 16px; color: #333; font-weight: bold;">
              ${email}
            </p>
          </div>
        `,
      });
      
      console.log("Admin notification email sent successfully");
    } catch (adminEmailError) {
      console.error("Error sending admin notification:", adminEmailError);
      // Continue execution even if admin email fails
    }
    
    // Close connection
    try {
      await client.close();
    } catch (closeError) {
      console.error("Error closing SMTP connection:", closeError);
    }
    
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Subscription error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
