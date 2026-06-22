const resetPasswordTemplate = (username, otp) => {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body{
    margin:0;
    padding:0;
    background:#f4f6f8;
    font-family:Arial,Helvetica,sans-serif;
}

.container{
    max-width:600px;
    margin:30px auto;
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 5px 20px rgba(0,0,0,0.08);
}

.header{
    background:#111827;
    text-align:center;
    padding:25px;
}

.logo{
    color:white;
    font-size:28px;
    font-weight:bold;
}

.content{
    padding:40px 30px;
}

.title{
    color:#111827;
    font-size:26px;
    font-weight:bold;
    margin-bottom:10px;
}

.text{
    color:#4b5563;
    line-height:1.8;
    font-size:15px;
}

.otp-box{
    background:#111827;
    color:white;
    text-align:center;
    font-size:38px;
    font-weight:bold;
    letter-spacing:10px;
    padding:22px;
    border-radius:10px;
    margin:30px 0;
}

.warning{
    background:#fff7ed;
    border-left:4px solid #f97316;
    padding:15px;
    color:#9a3412;
    margin-top:20px;
    border-radius:6px;
}

.footer{
    background:#f9fafb;
    text-align:center;
    padding:25px;
    color:#6b7280;
    font-size:13px;
}

.support{
    color:#2563eb;
    text-decoration:none;
}
</style>

</head>

<body>

<div class="container">

    <div class="header">
        <div class="logo">
            YourStore
        </div>
    </div>

    <div class="content">

        <div class="title">
            Reset Your Password
        </div>

        <p class="text">
            Hi <strong>${username}</strong>,
        </p>

        <p class="text">
            We received a request to reset the password associated with your account.
            Use the verification code below to continue.
        </p>

        <div class="otp-box">
            ${otp}
        </div>

        <p class="text">
            This verification code will expire in <strong>10 minutes</strong>.
        </p>

        <div class="warning">
            ⚠️ If you didn't request a password reset, you can safely ignore this email.
            Your account remains secure.
        </div>

    </div>

    <div class="footer">
        <p>
            Need help? Contact our support team.
        </p>

        <p>
            © 2026 YourStore. All Rights Reserved.
        </p>
    </div>

</div>

</body>
</html>
`;
};

module.exports = resetPasswordTemplate;