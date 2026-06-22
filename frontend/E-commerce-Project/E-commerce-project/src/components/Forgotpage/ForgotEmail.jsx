import React from 'react'

export const ForgotEmail = ({ email, setEmail, sendOtp, loading }) => {
  return (
    <div className="mt-8">

              <label className="font-semibold block mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-zinc-300 rounded-xl px-5 py-4 outline-none focus:border-black"
              />

              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full bg-black text-white py-4 rounded-xl font-bold mt-5 hover:bg-zinc-800 transition-all"
              >
                Send OTP
              </button>
            </div>
  )
}
