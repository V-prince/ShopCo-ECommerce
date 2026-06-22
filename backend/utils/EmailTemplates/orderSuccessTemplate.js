const orderSuccessTemplate = (
  username,
  orderId,
  amount
) => {
  return `
<!DOCTYPE html>
<html>
<head>
<style>
body{
    font-family:Arial,sans-serif;
    background:#f4f4f4;
    padding:20px;
}
.container{
    max-width:600px;
    margin:auto;
    background:white;
    border-radius:12px;
    overflow:hidden;
}
.header{
    background:#111827;
    color:white;
    text-align:center;
    padding:20px;
}
.content{
    padding:30px;
}
.order-box{
    background:#f9fafb;
    padding:15px;
    border-radius:8px;
    margin:20px 0;
}
.btn{
    display:inline-block;
    padding:12px 20px;
    background:#2563eb;
    color:white !important;
    text-decoration:none;
    border-radius:6px;
}
.footer{
    text-align:center;
    padding:20px;
    color:#6b7280;
}
</style>
</head>

<body>

<div class="container">

<div class="header">
<h1>Shop.Co</h1>
</div>

<div class="content">

<h2>Order Confirmed 🎉</h2>

<p>Hello <b>${username}</b>,</p>

<p>
Thank you for your purchase.
Your order has been confirmed and is being processed.
</p>

<div class="order-box">
<p><strong>Order ID:</strong> ${orderId}</p>
<p><strong>Total:</strong> ₹${amount}</p>
</div>

<a href="https://yourwebsite.com/orders" class="btn">
Track Order
</a>

</div>

<div class="footer">
© 2026 Your Store. All rights reserved.
</div>

</div>

</body>
</html>
`;
}

module.exports = orderSuccessTemplate