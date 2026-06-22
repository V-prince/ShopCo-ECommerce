const InovoiceTemplate = (order) => {
  return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Invoice</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
    background: #f6f6f6;
    padding: 30px;
}

.invoice {
    max-width: 900px;
    margin: auto;
    background: #ffffff;
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #111;
    padding-bottom: 20px;
}

.company h2 {
    color: #111;
    font-size: 32px;
    font-weight: 800;
}

.company p {
    color: #666;
    font-size: 14px;
}

.invoice-info {
    margin: 35px 0;
    display: flex;
    justify-content: space-between;
}

.customer h3,
.details h3 {
    color: #111;
    margin-bottom: 10px;
    font-size: 18px;
}

.customer p,
.details p {
    color: #555;
    line-height: 1.8;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 25px;
}

thead {
    background: #111;
    color: white;
}

th {
    padding: 14px;
    font-weight: 600;
}

td {
    padding: 14px;
    border-bottom: 1px solid #eee;
}

tbody tr:hover {
    background: #fafafa;
}

.summary {
    width: 320px;
    margin-left: auto;
    margin-top: 30px;
}

.summary div {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
}

.grand-total {
    border-top: 2px solid #111;
    margin-top: 10px;
    padding-top: 15px;
    font-size: 24px;
    font-weight: 700;
    color: #111;
}

.footer {
    margin-top: 50px;
    text-align: center;
    border-top: 1px solid #eee;
    padding-top: 25px;
}

.footer h3 {
    color: #111;
    margin-bottom: 8px;
}

.footer p {
    color: #777;
}
    </style>
</head>

<body>

    <div class="invoice">

        <!-- Header -->

        <div class="header">
            <div class="company">
                <h2>Shop.Co</h2>
                <p>+91 888-999-111</p>
            </div>

        </div>

        <!-- Invoice Info -->

        <div class="invoice-info">

            <div class="customer">
                <h3>Bill To</h3>

                <p>${order.userId.name}</p>
                <p>${order.address}</p>
                <p>${order.postalCode}</p>
                <p>${order.userId.email}</p>
            </div>

            <div class="details">
                <h3>Invoice Details</h3>

                <p><strong>Invoice No:</strong> INV-2026001</p>
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>Date:</strong>${new Date(order.createdAt).toLocaleDateString("en-IN")}</p>
                <p><strong>Payment:</strong> ${order.paymentStatus}</p>
            </div>

        </div>

        <!-- Products -->

        <table>

            <thead>
                <tr>
                    <th>Product</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>

            <tbody>
                ${order.products.map(
    (product) => `
    <tr>
      <td>${product.title}</td>
      <td>${product.size}</td>
      <td>${product.quantity}</td>
      <td>₹${product.price}</td>
      <td>₹${product.price * product.quantity}</td>
    </tr>`
  )}

            </tbody>

        </table>

        <!-- Summary -->

        <div class="summary">

            <div>
                <span>Subtotal</span>
                <span>₹${order.subtotal}</span>
            </div>

            ${order.products
      .map(
        (product) =>
          `
    <div> 
    <span>Discount(${product.discount})</span>
      <span>- ₹${((product.price * product.quantity * (product.discount || 0)) / 100).toFixed(0)}</span>  </div> `,
      )
      .join("")}
          

            <div>
                <span>Shipping</span>
                <span>₹15</span>
            </div>

            <div class="grand-total">
                <span>Total</span>
                <span>₹${order.finalAmount}</span>
            </div>

        </div >

  <div class="footer">

    <h3>Thank You For Shopping ❤️</h3>

    <p>www.shopco.com</p>

  </div>

    </div >

</body >

</html >
  `;
};

module.exports = InovoiceTemplate;
