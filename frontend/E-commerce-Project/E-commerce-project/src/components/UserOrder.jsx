import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaMapMarkerAlt, FaCheckCircle, FaBox, FaTimesCircle, FaHome, FaShippingFast, FaTruck, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CancleOrderApI, getUserOrders } from "../services/api";
import { Loading } from "./Loading";
import { ConfirmModal } from "./Warnings/ConfirmModal";


export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, Setloading] = useState(false);
  const [popup, SetpopUp] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      Setloading(true)
      const data = await getUserOrders();

      if (data.success) {
        setOrders(data.orders);
      }
    }
    finally {
      Setloading(false)
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      const data = await CancleOrderApI(id)
      if (!data.success) {
        console.log(data.message)
        return
      }
      SetpopUp(null)
    } finally {
      await loadOrders()
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FaBox className="text-yellow-500" />;

      case "confirmed":
        return <FaCheckCircle className="text-blue-500" />;

      case "shipped":
        return <FaTruck className="text-purple-500" />;

      case "out_for_delivery":
        return <FaShippingFast className="text-orange-500" />;

      case "delivered":
        return <FaHome className="text-green-500" />;

      case "cancelled":
        return <FaTimesCircle className="text-red-500" />;

      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  const getPaymentStatus = (status) => {
    switch (status) {
      case "paid":
        return {
          icon: <FaCheckCircle />,
          className: "bg-green-100 text-green-700",
        };

      case "pending":
        return {
          icon: <FaClock />,
          className: "bg-yellow-100 text-yellow-700",
        };

      case "failed":
        return {
          icon: <FaTimesCircle />,
          className: "bg-red-100 text-red-700",
        };

      default:
        return {
          icon: <FaClock />,
          className: "bg-gray-100 text-gray-700",
        };
    }
  };

  return (

    <section className="min-h-screen bg-[#f1f3f6]n mt-10 py-24">
      {loading ? <Loading /> : (<>
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}

          <div className="flex items-center justify-between mb-8">

            <div>

              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-black font-medium mb-3 cursor-pointer"
              >
                <FaArrowLeft />
                Back
              </button>

              <h1 className="text-4xl font-bold">
                My Orders
              </h1>

            </div>

          </div>

          {orders.length === 0 ? (

            <div className="bg-white rounded-lg p-10 text-center">

              <h2 className="text-2xl font-bold">
                No Orders Found
              </h2>

              <p className="text-zinc-500 mt-2">
                Start shopping now
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {orders.map((order) =>
                order.products.map((product) => (

                  <div
                    key={`${order._id}-${product.productId}`}
                    className="bg-white rounded-lg shadow-sm border"
                  >

                    <div className="p-6">

                      <div className="grid lg:grid-cols-4 gap-6">


                        <div>

                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-40 h-40 object-cover rounded-lg mx-auto shadow-2xl"
                          />

                        </div>

                        <div className="lg:col-span-2">

                          <h2 className="text-xl font-semibold">
                            {product.title}
                          </h2>

                          <p className="text-zinc-500 mt-2">
                            Size : {product.size}
                          </p>

                          <p className="text-zinc-500">
                            Color : {product.color}
                          </p>

                          <p className="text-zinc-500">
                            Quantity : {product.quantity}
                          </p>

                          <h3 className="text-3xl font-bold mt-4">
                            ₹{product.totalPrice.toFixed(2)}
                          </h3>

                          <p className="text-green-600 font-semibold mt-1">
                            {product.discount}% OFF
                          </p>

                        </div>



                        <div>

                          <div className="flex items-center gap-2">

                            {getStatusIcon(order.orderStatus)}

                            <span className="font-semibold capitalize">
                              {order.orderStatus.replaceAll("_", " ")}
                            </span>

                          </div>

                          <p className="text-zinc-500 text-sm mt-2">
                            Ordered on{" "}
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}
                          </p>

                          <div className="mt-6">

                            <span
                              className={`
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-medium
                            flex
                            items-center
                            gap-2
                            w-fit
                            ${getPaymentStatus(order.paymentStatus).className}
                            `}
                            >
                              {getPaymentStatus(order.paymentStatus).icon}
                              {order.paymentStatus}
                            </span>

                          </div>

                        </div>

                      </div>



                      <div className="border-t mt-8 pt-8">

                        <h3 className="font-semibold text-lg mb-5">
                          Order Tracking
                        </h3>

                        <div className="space-y-5">

                          <div className="flex items-center gap-4">
                            <div
                              className={`w-4 h-4 rounded-full ${[
                                "pending",
                                "confirmed",
                                "shipped",
                                "out_for_delivery",
                                "delivered"
                              ].includes(order.orderStatus)
                                ? "bg-green-500"
                                : "bg-zinc-300"
                                }`}
                            />
                            <p>Order Confirmed</p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div
                              className={`w-4 h-4 rounded-full ${[
                                "shipped",
                                "out_for_delivery",
                                "delivered"
                              ].includes(order.orderStatus)
                                ? "bg-green-500"
                                : "bg-zinc-300"
                                }`}
                            />
                            <p>Shipped</p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div
                              className={`w-4 h-4 rounded-full ${[
                                "out_for_delivery",
                                "delivered",
                              ].includes(order.orderStatus)
                                ? "bg-green-500"
                                : "bg-zinc-300"
                                }`}
                            />
                            <p>Out For Delivery</p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div
                              className={`w-4 h-4 rounded-full ${order.orderStatus === "delivered"
                                ? "bg-green-500"
                                : "bg-zinc-300"
                                }`}
                            />
                            <p>Delivered</p>
                          </div>

                        </div>

                      </div>


                      <div className="border-t mt-8 pt-8">

                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          <FaMapMarkerAlt />
                          Delivery Address
                        </h3>

                        <p className="text-zinc-600 mt-3">
                          {order.address}
                        </p>

                        <p className="text-zinc-600">
                          {order.city} - {order.postalCode}
                        </p>

                      </div>
                      {
                        popup &&
                        <ConfirmModal
                          title="Cancel Order"
                          message="Are you sure you want to cancel this order?"
                          onConfirm={() => handleCancelOrder(popup)}
                          onClose={() => SetpopUp(null)}
                        />
                      }
                      <div className="border-t mt-8 pt-6 flex gap-4 flex-wrap">
                        {
                          order.orderStatus !== "cancelled" && <button onClick={() => window.open(`https://shopco-ecommerce-yael.onrender.com/api/products/invoice/${order._id}`)} className="bg-blue-600 text-white px-6 py-3 cursor-pointer rounded-lg font-medium">
                            Download Invoice
                          </button>
                        }


                        {["pending",
                          "confirmed"
                        ].includes(order.orderStatus) &&
                          <button onClick={() => SetpopUp(order._id)} className="bg-red-600 text-white px-6 py-3 cursor-pointer rounded-lg font-medium">
                            Cancle Order
                          </button>}
                      </div>

                    </div>

                  </div>

                ))
              )}

            </div>

          )}

        </div>
      </>)}
    </section>

  );
}