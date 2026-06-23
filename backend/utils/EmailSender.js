const Brevo = require('@getbrevo/brevo');

// Initialize the API client
const apiInstance = new Brevo.TransactionalEmailsApi();

// Configure API key authorization
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_PASS; // Use your Brevo API key here

const EmailSender = async (to, sub, content) => {
    try {
        const sendSmtpEmail = new Brevo.SendSmtpEmail();

        sendSmtpEmail.subject = sub;
        sendSmtpEmail.htmlContent = content;
        sendSmtpEmail.sender = { name: "Shop.Co", email: process.env.BREVO_USER };
        sendSmtpEmail.to = [{ email: to }];

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log("Email sent successfully via API. Message ID:", data.body.messageId);

    } catch (error) {
        console.error("Error sending email via Brevo API:", error);
        throw new Error("Failed to send email");
    }
};

module.exports = EmailSender;