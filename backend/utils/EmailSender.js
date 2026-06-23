const nodemailer = require("nodemailer");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_EMAIL_API_KEY)


const EmailSender = async (to, sub, content) => {
    try {

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject: sub,
            html: content,
        })
        console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

        console.log("Email sent");

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = EmailSender;