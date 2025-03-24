
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

## Setting Up the Domain

If you're deploying to a subdomain or a specific directory:

1. In cPanel, go to Domains or Subdomains section
2. Point your domain or subdomain to the directory where you uploaded your files

## Troubleshooting

- If routes don't work, check that the `.htaccess` file was uploaded correctly
- If you see 500 errors, check that mod_rewrite is enabled on your server
- For API issues, make sure Supabase URLs and keys are configured correctly

## Environment Variables

For Supabase connection, make sure your host supports environment variables or:

1. Create a PHP file in your server to provide the variables to the client (not recommended for security reasons)
2. Update the Vercel.json file to reflect your actual environment variables
