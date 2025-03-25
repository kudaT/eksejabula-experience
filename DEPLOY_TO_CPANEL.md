
# Deploying to cPanel

This guide will help you deploy your React application to a cPanel server.

## Prerequisites

1. A cPanel hosting account
2. Node.js installed on your local machine
3. Access to cPanel File Manager or FTP credentials

## Build Process

1. Build the application locally:
   ```
   npm run build
   ```

2. This will create a `dist` folder with all the production-ready files.

## Deployment Options

### Option 1: Using File Manager

1. Log in to your cPanel account
2. Open File Manager
3. Navigate to the public_html directory or a subdirectory where you want to deploy
4. Upload all contents of the `dist` folder to this directory
5. Make sure the `.htaccess` file is uploaded properly (it might be hidden by default)

### Option 2: Using FTP

1. Use an FTP client (like FileZilla) to connect to your server
2. Navigate to the public_html directory or subdirectory
3. Upload all contents of the `dist` folder to this directory

## Supabase Configuration

For Supabase authentication to work correctly with your domain:

1. Go to the Supabase Dashboard > URL Configuration: https://app.supabase.com/project/iqwbqadqqkdndxdlbwrr/auth/url-configuration
2. Update the Site URL to: `https://eksejabula.co.za`
3. Add the following Redirect URLs:
   - `https://eksejabula.co.za/auth/callback`
   - `https://www.eksejabula.co.za/auth/callback` (if you use the www subdomain)
4. Save your changes

## SMTP Configuration (For Authentication Emails)

To use your custom SMTP server (info@eksejabula.co.za) for authentication emails:

1. Go to the Supabase Dashboard > Email Templates: https://app.supabase.com/project/iqwbqadqqkdndxdlbwrr/auth/templates
2. Choose "Custom SMTP" in the email provider dropdown
3. Enter your SMTP credentials:
   - SMTP Host: mail.eksejabula.co.za (or your mail server)
   - SMTP Port: 587 (for TLS) or 465 (for SSL)
   - SMTP Username: info@eksejabula.co.za
   - SMTP Password: Your email password
   - Sender Name: Eksejabula
   - Sender Email: info@eksejabula.co.za
4. Click "Test" to verify your configuration
5. Save your settings

### Edge Function SMTP Configuration

If you're using the custom edge function for emails, also set these secrets:

1. Go to the Supabase Dashboard > Edge Functions: https://app.supabase.com/project/iqwbqadqqkdndxdlbwrr/settings/functions
2. Add the following secrets:
   - `SMTP_HOST` (e.g., mail.eksejabula.co.za)
   - `SMTP_PORT` (typically 587 for TLS or 465 for SSL)
   - `SMTP_USERNAME` (info@eksejabula.co.za)
   - `SMTP_PASSWORD` (your email password)
   - `SMTP_FROM` (Eksejabula <info@eksejabula.co.za>)

## Setting Up the Domain

If you're deploying to a subdomain or a specific directory:

1. In cPanel, go to Domains or Subdomains section
2. Point your domain or subdomain to the directory where you uploaded your files

## Troubleshooting

- If routes don't work, check that the `.htaccess` file was uploaded correctly
- If you see 500 errors, check that mod_rewrite is enabled on your server
- For API issues, make sure Supabase URLs and keys are configured correctly
- If authentication emails are going to spam, ensure your SMTP server has proper SPF/DKIM records

## Environment Variables

For Supabase connection, make sure your host supports environment variables or:

1. The Supabase URL and keys are already included in the built code
2. If you need to update them, you'll need to update the relevant files in the build
