const nodemailer = require('nodemailer');

const EmailSender = async (to, sub, content) => {
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_HOST,
                pass: process.env.EMAIL_PASSWORD,
            }
        })

        await transporter.sendMail({
            from: `"Shop.Co"<${process.env.EMAIL_HOST}>`,
            to: to,
            subject: sub,
            html: content
        })

    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

module.exports = EmailSender;