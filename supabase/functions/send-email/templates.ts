
// Base email template layout
const baseTemplate = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Eksejabula</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f5f5f7;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #eaeaea;
    }
    .logo {
      max-width: 150px;
      height: auto;
    }
    .content {
      padding: 30px 20px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #888;
      background-color: #f7f7f7;
    }
    h1 {
      color: #1d1d1f;
      margin-top: 0;
    }
    .button {
      display: inline-block;
      background-color: #2997ff;
      color: white;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin: 20px 0;
    }
    .product-item {
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #eaeaea;
    }
    .product-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      margin-right: 15px;
      vertical-align: top;
    }
    .product-details {
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 100px);
    }
    .total-row {
      font-weight: bold;
      padding-top: 15px;
      border-top: 2px solid #eaeaea;
    }
    .address-box {
      background-color: #f5f5f7;
      padding: 15px;
      border-radius: 4px;
      margin: 15px 0;
    }
    @media only screen and (max-width: 480px) {
      .container {
        width: 100% !important;
      }
      .product-image {
        width: 60px;
        height: 60px;
      }
      .product-details {
        width: calc(100% - 80px);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://eksejabula.com/logo.png" alt="Eksejabula" class="logo">
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      &copy; ${new Date().getFullYear()} Eksejabula. All rights reserved.<br>
      123 Fashion Street, Johannesburg, South Africa<br>
      <a href="https://eksejabula.com/privacy-policy">Privacy Policy</a> | 
      <a href="https://eksejabula.com/terms">Terms of Service</a> | 
      <a href="https://eksejabula.com/contact">Contact Us</a>
    </div>
  </div>
</body>
</html>
`;

// Order confirmation email template
export const orderConfirmation = (data: any) => {
  const { customer_name, order_id, order_items, shipping_address, total_amount, order_date } = data;
  
  // Format product items
  const productsHtml = order_items.map((item: any) => `
    <div class="product-item">
      <img src="${item.products.image_urls[0]}" alt="${item.products.name}" class="product-image">
      <div class="product-details">
        <strong>${item.products.name}</strong><br>
        Quantity: ${item.quantity}<br>
        ${item.custom_text ? `Custom Text: ${item.custom_text}<br>` : ''}
        ${item.custom_number ? `Custom Number: ${item.custom_number}<br>` : ''}
        Price: R${(item.quantity * item.products.price).toFixed(2)}
      </div>
    </div>
  `).join('');
  
  // Format shipping address
  const addressHtml = `
    <div class="address-box">
      <strong>Shipping Address:</strong><br>
      ${shipping_address.full_name}<br>
      ${shipping_address.address_line1}<br>
      ${shipping_address.address_line2 ? shipping_address.address_line2 + '<br>' : ''}
      ${shipping_address.city}, ${shipping_address.province} ${shipping_address.postal_code}<br>
      Phone: ${shipping_address.phone_number}
    </div>
  `;
  
  const content = `
    <h1>Thank You for Your Order!</h1>
    <p>Hello ${customer_name},</p>
    <p>We're excited to confirm your order with Eksejabula. Here's a summary of your purchase:</p>
    
    <p><strong>Order Number:</strong> #${order_id.substring(0, 8)}<br>
    <strong>Order Date:</strong> ${order_date}</p>
    
    <h2>Order Summary</h2>
    ${productsHtml}
    
    <p class="total-row">Total: R${parseFloat(total_amount).toFixed(2)}</p>
    
    <h2>Delivery Information</h2>
    ${addressHtml}
    
    <p>We'll send you another email when your order ships. You can also check your order status anytime by visiting your account.</p>
    
    <a href="https://eksejabula.com/account/orders/${order_id}" class="button">View Order</a>
    
    <p>Thank you for shopping with Eksejabula!</p>
  `;
  
  return baseTemplate(content);
};

// Shipping confirmation email template
export const shippingConfirmation = (data: any) => {
  const { customer_name, order_id, tracking_number, carrier, estimated_delivery } = data;
  
  const content = `
    <h1>Your Order Has Shipped!</h1>
    <p>Hello ${customer_name},</p>
    <p>Great news! Your Eksejabula order #${order_id.substring(0, 8)} is on its way to you.</p>
    
    <div style="background-color: #f5f5f7; padding: 15px; border-radius: 4px; margin: 15px 0;">
      <strong>Tracking Information:</strong><br>
      Carrier: ${carrier}<br>
      Tracking Number: ${tracking_number}<br>
      Estimated Delivery: ${estimated_delivery}
    </div>
    
    <a href="https://${carrier.toLowerCase().replace(/\s+/g, '')}.com/track?number=${tracking_number}" class="button">Track Your Package</a>
    
    <p>You can also view your order and tracking details by visiting your account.</p>
    
    <a href="https://eksejabula.com/account/orders/${order_id}" class="button">View Order</a>
    
    <p>Thank you for shopping with Eksejabula!</p>
  `;
  
  return baseTemplate(content);
};

// New order notification to admin
export const adminOrderNotification = (data: any) => {
  const { order_id, customer_name, customer_email, total_amount, items_count } = data;
  
  const content = `
    <h1>New Order Received</h1>
    <p>A new order has been placed on Eksejabula:</p>
    
    <div style="background-color: #f5f5f7; padding: 15px; border-radius: 4px; margin: 15px 0;">
      <strong>Order ID:</strong> #${order_id.substring(0, 8)}<br>
      <strong>Customer:</strong> ${customer_name} (${customer_email})<br>
      <strong>Items:</strong> ${items_count}<br>
      <strong>Total Amount:</strong> R${parseFloat(total_amount).toFixed(2)}<br>
      <strong>Date:</strong> ${new Date().toLocaleString()}
    </div>
    
    <a href="https://eksejabula.com/admin/orders/${order_id}" class="button">View Order Details</a>
    
    <p>Please process this order as soon as possible.</p>
  `;
  
  return baseTemplate(content);
};

// Contact form confirmation
export const contactConfirmation = (data: any) => {
  const { name, email, message } = data;
  
  const content = `
    <h1>We've Received Your Message</h1>
    <p>Hello ${name},</p>
    <p>Thank you for contacting Eksejabula. We've received your message and will get back to you as soon as possible.</p>
    
    <div style="background-color: #f5f5f7; padding: 15px; border-radius: 4px; margin: 15px 0;">
      <strong>Your Message:</strong><br>
      ${message.replace(/\n/g, '<br>')}
    </div>
    
    <p>If you have any additional questions or information to share, please reply to this email.</p>
    
    <p>Best regards,<br>The Eksejabula Team</p>
  `;
  
  return baseTemplate(content);
};

// Password reset template
export const passwordReset = (data: any) => {
  const { name, reset_link } = data;
  
  const content = `
    <h1>Reset Your Password</h1>
    <p>Hello ${name},</p>
    <p>We received a request to reset your password for your Eksejabula account. Click the button below to set a new password:</p>
    
    <a href="${reset_link}" class="button">Reset Password</a>
    
    <p>If you didn't request a password reset, you can safely ignore this email.</p>
    
    <p>This link will expire in 1 hour for security reasons.</p>
    
    <p>Best regards,<br>The Eksejabula Team</p>
  `;
  
  return baseTemplate(content);
};

// Welcome email template
export const welcome = (data: any) => {
  const { name } = data;
  
  const content = `
    <h1>Welcome to Eksejabula!</h1>
    <p>Hello ${name},</p>
    <p>Thank you for creating an account with Eksejabula, your destination for premium South African fashion and accessories.</p>
    
    <p>With your new account, you can:</p>
    <ul>
      <li>Shop our exclusive collection of jerseys, beanies, and art</li>
      <li>Track your orders and view order history</li>
      <li>Save your favorite items to your wishlist</li>
      <li>Customize jerseys with your name and number</li>
    </ul>
    
    <a href="https://eksejabula.com/shop" class="button">Start Shopping</a>
    
    <p>If you have any questions or need assistance, please don't hesitate to contact our customer service team.</p>
    
    <p>Best regards,<br>The Eksejabula Team</p>
  `;
  
  return baseTemplate(content);
};
