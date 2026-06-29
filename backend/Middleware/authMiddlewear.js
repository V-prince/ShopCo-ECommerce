const jwt = require('jsonwebtoken')
exports.Auth = (req, res, next) => {

  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token Missing"
    });
  }

  try {

    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    req.user = decode;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token"
    });
  }
}