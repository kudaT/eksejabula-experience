
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  type: 'signup' | 'magiclink' | 'recovery' | 'invite';
  email: string;
  data: {
    token?: string;
    link?: string;
    [key: string]: any;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const { type, email, data }: EmailRequest = await req.json();
    
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
    
    let subject = "";
    let html = "";
    
    // Generate email content based on type
    switch (type) {
      case 'signup':
        subject = "Confirm your Eksejabula signup";
        html = generateSignupEmail(data.link || "");
        break;
      case 'magiclink':
        subject = "Your Eksejabula login link";
        html = generateMagicLinkEmail(data.link || "");
        break;
      case 'recovery':
        subject = "Reset your Eksejabula password";
        html = generatePasswordResetEmail(data.link || "");
        break;
      case 'invite':
        subject = "You've been invited to Eksejabula";
        html = generateInviteEmail(data.link || "");
        break;
      default:
        throw new Error("Unsupported email type");
    }
    
    // Send email
    await client.send({
      from: Deno.env.get("SMTP_FROM") || "info@eksejabula.co.za",
      to: email,
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

// Email template functions
function generateSignupEmail(link: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirm your signup</title>
      <style>
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          color: #333;
        }
        .header {
          background-color: #000;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          color: #fff;
          margin: 0;
        }
        .content {
          padding: 20px;
          line-height: 1.5;
        }
        .button {
          display: inline-block;
          background-color: #000;
          color: #fff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .footer {
          border-top: 1px solid #eee;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Eksejabula</h1>
        </div>
        <div class="content">
          <h2>Confirm your signup</h2>
          <p>Thank you for signing up for an Eksejabula account. Please confirm your email address by clicking the button below:</p>
          <a href="${link}" class="button">Confirm your email</a>
          <p>If you did not sign up for an Eksejabula account, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Eksejabula. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateMagicLinkEmail(link: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your login link</title>
      <style>
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          color: #333;
        }
        .header {
          background-color: #000;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          color: #fff;
          margin: 0;
        }
        .content {
          padding: 20px;
          line-height: 1.5;
        }
        .button {
          display: inline-block;
          background-color: #000;
          color: #fff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .footer {
          border-top: 1px solid #eee;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Eksejabula</h1>
        </div>
        <div class="content">
          <h2>Your login link</h2>
          <p>Click the button below to log in to your Eksejabula account:</p>
          <a href="${link}" class="button">Log in</a>
          <p>If you did not request this link, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Eksejabula. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generatePasswordResetEmail(link: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Reset your password</title>
      <style>
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          color: #333;
        }
        .header {
          background-color: #000;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          color: #fff;
          margin: 0;
        }
        .content {
          padding: 20px;
          line-height: 1.5;
        }
        .button {
          display: inline-block;
          background-color: #000;
          color: #fff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .footer {
          border-top: 1px solid #eee;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Eksejabula</h1>
        </div>
        <div class="content">
          <h2>Reset your password</h2>
          <p>You have requested to reset your password. Click the button below to set a new password for your Eksejabula account:</p>
          <a href="${link}" class="button">Reset password</a>
          <p>If you did not request a password reset, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Eksejabula. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateInviteEmail(link: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>You've been invited</title>
      <style>
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          font-family: Arial, sans-serif;
          color: #333;
        }
        .header {
          background-color: #000;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          color: #fff;
          margin: 0;
        }
        .content {
          padding: 20px;
          line-height: 1.5;
        }
        .button {
          display: inline-block;
          background-color: #000;
          color: #fff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin: 20px 0;
        }
        .footer {
          border-top: 1px solid #eee;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Eksejabula</h1>
        </div>
        <div class="content">
          <h2>You've been invited to Eksejabula</h2>
          <p>You have been invited to join Eksejabula. Click the button below to accept the invitation:</p>
          <a href="${link}" class="button">Accept invitation</a>
          <p>If you were not expecting this invitation, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Eksejabula. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
