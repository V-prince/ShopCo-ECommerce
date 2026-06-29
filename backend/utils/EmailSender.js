const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);


const EmailSender = async (to, sub, content) => {
    try {
        const data = await resend.emails.send({
            from: "shopcoinfos@gmail.com",
            to: to,
            subject: sub,
            html: content,
        });
    } catch (error) {
        console.log("Resend Error:", error);
    }
};

module.exports = EmailSender;