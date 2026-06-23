const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
    }
});


const EmailSender = async (to, sub, content) => {
    try {

        await transporter.sendMail({
            from: `"Shop.Co" <${process.env.EMAIL_HOST}>`,
            to,
            subject: sub,
            html: content
        });

        console.log("Email sent");

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = EmailSender;