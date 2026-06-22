import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { sendNewPassword, sentEmailForForgotPassword, verifyOtpForForgotPassword } from "../services/api";
import { toast } from "react-toastify";
import { Loading } from "./Loading";
import { useNavigate } from "react-router-dom";
import { ForgotEmail } from "./Forgotpage/ForgotEmail";
import { OtpSection } from "./Forgotpage/OtpSection";
import { NewPasswordSection } from "./Forgotpage/newPasswordSection";
export const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const sendOtp = async () => {
    // API Call Here
    setLoading(true);
    const data = await sentEmailForForgotPassword(email);
    setLoading(false);

    if (!data.success) {
      toast.error(data.message, { position: "top-center" })
      return;
    }
    toast.success(data.message, { position: "top-center" })
    setOtpSent(true);
  };

  const verifyOtp = async () => {

    if (otp.length !== 6) {
      return alert("Enter valid 6 digit OTP");
    }

    // API Call Here
    const data = await verifyOtpForForgotPassword(email, otp);
    if (!data.success) {
      toast.error(data.message, { position: "top-center" })
      return;
    }
    toast.success(data.message, { position: "top-center" })
    setOtpVerified(true);
  };

  const resetPassword = async () => {

    if (!newPassword || !confirmPassword) {
      return alert("Please fill all fields");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }
    // API Call Here
    const data = await sendNewPassword(email, newPassword)
    // await ResetPassword(email, newPassword)
    if (!data.success) {
      toast.error(data.message, { position: "top-center" })
      return;
    }
    toast.success(data.message, { position: "top-center" })
    navigate('/login')
  };

  return (
    <section className="min-h-screen bg-zinc-100 flex items-center justify-center px-5">
      {loading ? <Loading /> :
        <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-8 md:p-12">

          <div className="text-center">

            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-5">
              <FaLock size={24} />
            </div>

            <h1 className="text-4xl font-extrabold">
              Forgot Password
            </h1>

            <p className="text-zinc-500 mt-3">
              Reset your password securely
            </p>

          </div>

          {!otpSent && (
            <ForgotEmail email={email} setEmail={setEmail} sendOtp={sendOtp} loading={loading} />
          )}

          {/* OTP Section */}
          {otpSent && !otpVerified && (
            <OtpSection otp={otp} setOtp={setOtp} verifyOtp={verifyOtp} />
          )}


          {otpVerified && (
            <NewPasswordSection newPassword={newPassword} setNewPassword={setNewPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} resetPassword={resetPassword} />
          )}

        </div>


      }

    </section >
  );
};