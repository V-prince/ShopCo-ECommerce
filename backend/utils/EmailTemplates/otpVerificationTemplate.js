const verificationTemplate = (
  username,
  otp
) => {
  return `
<!DOCTYPE html>
<html>

<body style="font-family:Arial;background:#f3f4f6;padding:20px;">

<div style="max-width:600px;margin:auto;background:white;border-radius:12px;padding:30px;">

<h2>Email Verification</h2>

<p>Hello ${username},</p>

<p>
Please use the following OTP to verify your account.
</p>

<div style="
background:#111827;
color:white;
font-size:32px;
font-weight:bold;
padding:20px;
text-align:center;
border-radius:10px;
letter-spacing:10px;
margin:20px 0;
">
${otp}
</div>

<p>
This OTP is valid for 10 minutes.
</p>

</div>

</body>
</html>
`;
};

module.exports = verificationTemplate