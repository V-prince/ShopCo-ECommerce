const { GoogleGenerativeAI } = require("@google/generative-ai");
const { extractProductId, getProductById } = require("../utils/AIChatbot/extractProductId");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY,
)

exports.chatwithAi = async (req, res) => {
  try {

    const message = req.body.message;

    const lowerMsg = message.toLowerCase()
    if (lowerMsg.includes("refund")) {
      return res.status(200).json({
        success: true,
        reply: "Refunds are processed within 5-7 business days."
      });
    }

    if (message.toLowerCase().includes("return")) {
      return res.status(200).json({
        success: true,
        reply: "Return is available within 7 days.",
      });
    }

    let contextData = "";

    if (lowerMsg.includes("order")) {
      const orderId = extractProductId(message)
      if (orderId) {
        const order = await getProductById(orderId);
        contextData = order ? `Order Data:\n- Order ID: ${order._id}\n- Status: ${order.orderStatus}\n- ${!order.orderStatus.includes("confirmed") ? "Expected Delivery: 5-7 days" : ""}  || "N/A"}` : "Order Data: No order found with this ID.";
      }

    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    })


    const result = await model.generateContent(`You are Shop.Co AI Assistant.

Store Policies:
- Return within 7 days
- Refund in 5-7 days
- Delivery in 3-5 days
- COD available

${contextData ? `Real-time Data — use ONLY this exact data to answer. Do NOT make up or guess any details:\n${contextData}\n` : message}

Customer Question:
${message}
`)
    const response = result.response.text();
    res.status(200).json({
      success: true,
      reply: response,
    });

  } catch (error) {
    console.log(error);
    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        reply: "AI service busy. Please try again after a few seconds.",
      });
    }
    res.status(500).json({
      success: false,
      message: "AI Error",
    });
  }
}
