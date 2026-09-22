const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);


const EmailSender = async (to, sub, content) => {

    try {

        await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sender: {
                    email: "vadherprince63@email.com",
                    name: "Shopco"
                },
                to: [
                    {
                        email: to
                    }
                ],
                subject: sub,
                htmlContent: content
            })
        });

    } catch (error) {
        console.log("Resend Error:", error);
    }





    // try {
    //     const data = await resend.emails.send({
    //         from: "onboarding@resend.dev",
    //         to: to,
    //         subject: sub,
    //         html: content,
    //     });

    //     console.log("Resend Response:", data);
    // } catch (error) {
    //     console.log("Resend Error:", error);
    // }
};

module.exports = EmailSender;