
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";
import * as templates from "./templates.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  template: keyof typeof templates;
  to: string;
  subject: string;
  data: Record<string, unknown>;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { template, to, subject, data } = await req.json() as EmailRequest;
    
    // Get email template function
    const templateFn = templates[template];
    if (!templateFn) {
      throw new Error(`Template "${template}" not found`);
    }
    
    // Generate email HTML
    const html = templateFn(data);
    
    // Configure SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: Deno.env.get("SMTP_HOST") || "",
        port: parseInt(Deno.env.get("SMTP_PORT") || "587"),
        tls: true,
        auth: {
          username: Deno.env.get("SMTP_USERNAME") || "",
          password: Deno.env.get("SMTP_PASSWORD") || "",
        },
      }
    });
    
    // Send email
    await client.send({
      from: Deno.env.get("SMTP_FROM") || "Eksejabula <noreply@eksejabula.com>",
      to,
      subject,
      html,
    });
    
    // Close connection
    await client.close();
    
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
