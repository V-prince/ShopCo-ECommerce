import React from 'react'

export const ConfirmModal = ({isOpen,title,message,onConfirm,onClose}) => {
  return (
    <div className="fixed inset-0  flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl">

        <h2 className="text-xl font-bold text-red-600">
          {title}
        </h2>

        <p className="text-zinc-600 mt-3">
          {message}
        </p>

        <p className="text-sm text-red-500 mt-2">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-zinc-300 hover:bg-zinc-100 transition"
          >
            Keep Order
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Yes, Cancel
          </button>

        </div>

      </div>
    </div>
  )
}
