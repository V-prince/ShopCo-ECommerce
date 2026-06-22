import React from "react";
import {
  FaHeadset,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaTruck,
  FaUndo,
  FaCreditCard,
  FaQuestionCircle,
} from "react-icons/fa";

const CustomerSupport = () => {
  return (
    <section className="max-w-7xl mt-15 mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-4">
          <FaHeadset className="text-5xl" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Customer Support
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto">
          Need help with your order, payment, shipping, or returns?
          Our support team is always ready to assist you.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition">
          <FaEnvelope className="text-3xl mx-auto mb-3" />
          <h3 className="font-bold text-xl mb-2">Email Us</h3>
          <p className="text-gray-600">support@shopco.com</p>
        </div>

        <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition">
          <FaPhoneAlt className="text-3xl mx-auto mb-3" />
          <h3 className="font-bold text-xl mb-2">Call Us</h3>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>

        <div className="border rounded-2xl p-6 text-center hover:shadow-lg transition">
          <FaClock className="text-3xl mx-auto mb-3" />
          <h3 className="font-bold text-xl mb-2">Working Hours</h3>
          <p className="text-gray-600">Mon - Sat | 9:00 AM - 7:00 PM</p>
        </div>
      </div>

      {/* Support Topics */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          How Can We Help?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="border rounded-2xl p-6 text-center">
            <FaTruck className="text-3xl mx-auto mb-3" />
            <h3 className="font-semibold">Order Tracking</h3>
          </div>

          <div className="border rounded-2xl p-6 text-center">
            <FaUndo className="text-3xl mx-auto mb-3" />
            <h3 className="font-semibold">Returns & Refunds</h3>
          </div>

          <div className="border rounded-2xl p-6 text-center">
            <FaCreditCard className="text-3xl mx-auto mb-3" />
            <h3 className="font-semibold">Payment Issues</h3>
          </div>

          <div className="border rounded-2xl p-6 text-center">
            <FaQuestionCircle className="text-3xl mx-auto mb-3" />
            <h3 className="font-semibold">General Queries</h3>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <details className="border rounded-xl p-4">
            <summary className="font-semibold cursor-pointer">
              How can I track my order?
            </summary>
            <p className="mt-3 text-gray-600">
              Go to My Orders and select your order to view the latest
              shipping status.
            </p>
          </details>

          <details className="border rounded-xl p-4">
            <summary className="font-semibold cursor-pointer">
              Can I cancel my order?
            </summary>
            <p className="mt-3 text-gray-600">
              Orders can be cancelled before they are shipped.
            </p>
          </details>

          <details className="border rounded-xl p-4">
            <summary className="font-semibold cursor-pointer">
              When will I receive my refund?
            </summary>
            <p className="mt-3 text-gray-600">
              Refunds are usually processed within 5-7 business days.
            </p>
          </details>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-100 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Send Us a Message
        </h2>

        <form className="max-w-3xl mx-auto space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 rounded-xl border outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-4 rounded-xl border outline-none"
          />

          <textarea
            rows="5"
            placeholder="Describe your issue..."
            className="w-full p-4 rounded-xl border outline-none resize-none"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:opacity-90"
          >
            Submit Request
          </button>
        </form>
      </div>
    </section>
  );
};

export default CustomerSupport;