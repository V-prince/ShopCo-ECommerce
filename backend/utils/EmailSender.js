const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const EmailSender = async (to, subject, htmlContent) => {
  try {
    const email = new brevo.SendSmtpEmail();

    email.sender = {
      name: "Shop.co",
      email: "shopcoinfos@gmail.com"
    };

    email.to = [
      {
        email: to
      }
    ];

    email.subject = subject;
    email.htmlContent = htmlContent;

    const result = await apiInstance.sendTransacEmail(email);

    console.log("Email Sent:", result);

    return {
      success: true
    };
  } catch (err) {
    console.error(err);

    return {
      success: false,
      error: err.message
    };
  }
};

module.exports = EmailSender;