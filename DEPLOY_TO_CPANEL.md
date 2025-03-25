
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

1. Go to the Supabase Dashboard: https://app.supabase.com/project/iqwbqadqqkdndxdlbwrr/auth/url-configuration
2. Update the Site URL to: `https://eksejabula.co.za`
3. Add the following Redirect URLs:
   - `https://eksejabula.co.za/auth/callback`
   - `https://www.eksejabula.co.za/auth/callback` (if you use the www subdomain)
4. Save your changes

## SMTP Configuration (For Authentication Emails)

To use your custom SMTP server (info@eksejabula.co.za) for authentication emails:

1. Find your SMTP server details from your cPanel or email provider
2. Go to the Supabase Dashboard: https://app.supabase.com/project/iqwbqadqqkdndxdlbwrr/settings/functions
3. Add the following secrets for the auth-email function:
   - `SMTP_HOST` (e.g., mail.eksejabula.co.za)
   - `SMTP_PORT` (typically 587 for TLS)
   - `SMTP_USERNAME` (usually info@eksejabula.co.za)
   - `SMTP_PASSWORD` (your email password)
   - `SMTP_FROM` (info@eksejabula.co.za)

4. Then go to Email Templates in the Auth section: https://app.supabase.com/project/iqwbqadqqkdndxdlbwrr/auth/templates
5. To use the custom email function, choose "Custom SMTP" in the email provider dropdown

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

