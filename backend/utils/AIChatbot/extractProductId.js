const { default: mongoose } = require("mongoose");
const Product = require("../../models/Product");
const Order = require("../../models/Order");

exports.extractProductId = (message) => {
  const match = message.match(/\b[a-f0-9]{24}\b/i);
  return match ? match[0] : null;
}

exports.getProductById = async (id) => {
  const product = await Order.findById(id);
  return product
}