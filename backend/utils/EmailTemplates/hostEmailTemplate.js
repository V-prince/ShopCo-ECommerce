const hostOrderTemplate = (
  sellerName,
  orderId,
  products
) => {

  const rows = products.map(product => `
    <tr>
      <td>${product.title}</td>
      <td>${product.quantity}</td>
    </tr>
  `).join("");

  return `
    <h2>New Order Received 🎉</h2>

    <p>Hello ${sellerName},</p>

    <p>You have received a new order.</p>

    <p>Order ID: ${orderId}</p>

    <table border="1">
      <tr>
        <th>Product</th>
        <th>Qty</th>
      </tr>

      ${rows}
    </table>

  `;
};

module.exports = hostOrderTemplate