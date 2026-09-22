const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);


const EmailSender = async (to, sub, content) => {

    try {

        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "api-key": process.env.BREVO_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sender: {
                    email: "vadherprince63@email.com",
                    name: "ShopCo"
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

        const data = await res.json();

        console.log("Brevo Status:", res.status);
        console.log("Brevo Response:", data);

        if (!res.ok) {
            console.log("Brevo Error:", data);
            return;
        }

        console.log("Email Sent:", data);


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