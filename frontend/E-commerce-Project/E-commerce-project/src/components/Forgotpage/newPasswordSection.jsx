import React from 'react'

export const NewPasswordSection = ({ newPassword, setNewPassword, confirmPassword, setConfirmPassword, resetPassword }) => {
  return (
    <div className="mt-8">

      <label className="font-semibold block mb-2">
        New Password
      </label>

      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border border-zinc-300 rounded-xl px-5 py-4 mb-4 outline-none focus:border-black"
      />

      <label className="font-semibold block mb-2">
        Confirm Password
      </label>

      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border border-zinc-300 rounded-xl px-5 py-4 outline-none focus:border-black"
      />

      <button
        onClick={resetPassword}
        className="w-full bg-black text-white py-4 rounded-xl font-bold mt-5 hover:bg-zinc-800 transition-all"
      >
        Update Password
      </button>

    </div>
  )
}
