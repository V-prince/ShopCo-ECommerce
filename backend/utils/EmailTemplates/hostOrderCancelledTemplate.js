 const hostOrderCancelledTemplate = (hostName, customerName, orderId) => {
  return `

  <!DOCTYPE html> 

  <html>
  <head>
    <meta charset="UTF-8">
    <title>Order Cancelled</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif;">

<div style="max-width:600px;margin:30px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.08);">

  <div style="background:#dc2626;padding:30px;text-align:center;">
    <h1 style="color:white;margin:0;">Order Cancelled</h1>
  </div>

  <div style="padding:30px;">

    <h2 style="margin-top:0;">Hello ${hostName},</h2>

    <p style="color:#52525b;line-height:1.6;">
      A customer has cancelled an order containing your product(s).
    </p>

    <div style="background:#f8fafc;padding:20px;border-radius:10px;margin:25px 0;">
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Customer:</strong> ${customerName}</p>
      <p><strong>Status:</strong> Cancelled</p>
    </div>

    <div style="background:#eff6ff;border-left:4px solid #2563eb;padding:15px;border-radius:8px;">
      <strong>Inventory Updated</strong>
      <p style="margin:10px 0 0;color:#52525b;">
        The stock for the cancelled item(s) has been restored automatically.
      </p>
    </div>

    <p style="margin-top:25px;color:#52525b;">
      No further action is required from your side.
    </p>

    <p>
      Regards,<br/>
      <strong>ShopCo Seller Team</strong>
    </p>

  </div>

</div>


  </body>
  </html>
  `;
}


module.exports = hostOrderCancelledTemplate