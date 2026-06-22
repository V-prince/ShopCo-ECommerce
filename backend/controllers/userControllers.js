const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Rating = require("../models/Rating");
const User = require("../models/User");
const bcryept = require('bcryptjs')
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const EmailSender = require("../utils/EmailSender");
const { default: mongoose } = require("mongoose");
const otpVerification = require("../utils/EmailTemplates/otpVerificationTemplate")

const Fuse = require("fuse.js")

exports.getAllProducts = async (req, res) => {
    try {

        const products = await Product.find({ createdAt: { $lte: new Date() } }).sort({ createdAt: -1 });

        const topProducts = await Product.find().sort({ soldCount: -1 }).limit(10)

        res.status(201).json({ success: true, products, topProducts });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.SearchAllProducts = async (req, res) => {
    try {
        const search = req.query.search || ""

        const products = await Product.find()

        const fuse = new Fuse(products, {
            keys: ["title", "description", "price"],
            threshold: 0.5,
            ignoreLocation: true,
            minMatchCharLength: 2,
            includeScore: true,
            findAllMatches: true

        })

        const result = fuse.search(search)
        res.status(201).json({ success: true, products: result.map(item => item.item) });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getProductsById = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(500).json({ message: "id is not comes to server" });
        }
        const product = await Product.findById(id);
        res.status(201).json({ product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.postAddCartData = async (req, res) => {
    try {

        const { productId, size, color, quantity } = req.body

        const existingItem = await Cart.findOne({ userId: req.user.id, productId, size, color })

        if (existingItem) {
            existingItem.quantity += quantity
            await existingItem.save()
            res.json({
                message: "Cart Updated"
            });
        }
        else {
            await Cart.create({ ...req.body, userId: req.user.id })
            res.status(201).json({ message: "Cart data add sucessfully" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

}

exports.FetchAllCartsById = async (req, res) => {
    try {
        const products = await Cart.find({ userId: req.user.id }).populate("productId");

        if (!products) {
            return res.status(404).json({ message: "No cart items found for this user" });
        }

        res.status(201).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.DeleteCartItemById = async (req, res) => {
    try {
        const id = req.params.id
        if (!id) {
            return res.status(500).json({ message: "id is not comes to server" })
        }
        const deletedItem = await Cart.findOneAndDelete({ _id: id, userId: req.user.id })
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.IncrementAndDecrementCounterFromCart = async (req, res) => {
    try {
        const productId = req.params.id
        const { quantity } = req.body
        const updatedQty = await Cart.findOneAndUpdate({ _id: productId, userId: req.user.id }, {
            quantity
        })
        res.status(200).json(updatedQty)
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.CreateSignupPage = [

    check("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({ min: 3, max: 30 }).withMessage("Name must be between 3 and 30 characters")
        .matches(/^[A-Za-z\s]+$/).withMessage("Name should contain only letters"),

    check("email")
        .trim()
        .normalizeEmail()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please provide a valid email address"),

    check("phoneNo")
        .trim()
        .notEmpty().withMessage("Phone number is required")
        .isMobilePhone("en-IN").withMessage("Please provide a valid Indian phone number"),

    check("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
        .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter")
        .matches(/[a-z]/).withMessage("Password must contain at least one lowercase letter")
        .matches(/[0-9]/).withMessage("Password must contain at least one number")
        .matches(/[@$!%*?&]/).withMessage("Password must contain at least one special character"),

    check("role")
        .trim()
        .notEmpty().withMessage("Role is required")
        .isIn(["user", "host"]).withMessage("Invalid role selected"),

    check("imageUrl")
        .notEmpty()
        .withMessage("Please enter a Photo ")
        .trim()
        .isURL().withMessage("Please provide a valid image URL")
        .matches(/\.(jpg|jpeg|png|webp)$/i)
        .withMessage("Image must be jpg, jpeg, png, or webp format")
    , async (req, res) => {
        try {
            const { name, email, phoneNo, password, role, imageUrl } = req.body

            console.log("Signup Data Received:", req.body);

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const existingUser = await User.findOne({ email })

            if (existingUser) {
                return res.status(409).json({ success: false, message: "User is already Signup with email id " });
            }

            bcryept.hash(password, 10).then(async (hashedPassword) => {
                const user = await User.create({
                    name, email, phoneNo, password: hashedPassword, role, imageUrl
                })




                res.status(200).json({ success: true, message: "User is Created", user });
            })

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }]


exports.CreateLoginPage = async (req, res, next) => {
    const { email, password } = req.body

    if (!email && !password) {
        return res.status(409).json({ success: false, message: "Please Fill the field" });
    }

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(409).json({ success: false, message: "User does not exist" });
    }

    const isMatched = await bcryept.compare(password, user.password)

    if (!isMatched) {
        return res.status(409).json({ success: false, message: "Wrong password" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresIn = Date.now() + 5 * 60 * 1000;


    user.otp = otp;
    user.otpExpiresIn = expiresIn;
    user.otpVerified = false;

    const LoginVerificationTemplate = otpVerification(user.name, otp)

    await EmailSender(user.email, "Password Verification Otp", LoginVerificationTemplate);
    await user.save();

    res.status(200).json({ success: true, message: `${email} is Logged in Sucessfully` });
}

exports.verifyOtpForLogin = async (req, res) => {
    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "Please Enter OTP" })
        }

        const user = await User.findOne({ email })

        if (user.otp !== otp) {
            return res.status(400).json({ success: false, message: "Invalid  OTP" })
        }

        if (user.otpExpiresIn < Date.now()) {
            return res.status(400).json({ success: false, message: "OTP Expired" })
        }

        user.otp = null;
        user.otpExpiresIn = null;
        user.otpVerified = true;
        await user.save();

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        res.status(200).json({ success: true, message: "OTP verified successfully", token, user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate("products.productId").sort({"createdAt":-1})
        res.status(200).json({ success: true, orders })
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

