import React from 'react'

export const OtpSection = ({ otp, setOtp, verifyOtp }) => {
  return (
    <div className="mt-8">

      <label className="font-semibold block mb-2">
        Enter OTP
      </label>

      <input
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6 digit OTP"
        className="w-full border border-zinc-300 rounded-xl px-5 py-4 outline-none focus:border-black text-center text-xl font-bold tracking-[10px]"
      />

      <button
        onClick={verifyOtp}
        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold mt-5 hover:bg-green-700 transition-all"
      >
        Verify OTP
      </button>

    </div>
  )
}
