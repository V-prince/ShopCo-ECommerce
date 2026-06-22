import React, { useEffect, useMemo, useState } from "react";
import { FetchHostOrders, UpdateStatusOnServer } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaBoxOpen,
  FaTruck,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

export default function HostOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const data = await FetchHostOrders();

    if (data.success) {
      setOrders(data.orders);
    }
  };

  const flattenedOrders = useMemo(() => {
    return orders.flatMap((order) =>
      order.products.map((product) => ({
        ...product,
        orderId: order._id,
        customer: order.userId,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        phoneNo: order.phoneNo,
        address: order.address,
        city: order.city,
        postalCode: order.postalCode,
        createdAt: order.createdAt,
      }))
    );
  }, [orders]);

  const filteredOrders = flattenedOrders.filter((item) => {
    const matchSearch =
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.customer?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      filter === "all" || item.orderStatus === filter;

    return matchSearch && matchStatus;
  });

  const stats = {
    pending: flattenedOrders.filter(
      (o) => o.orderStatus === "pending"
    ).length,

    shipped: flattenedOrders.filter(
      (o) =>
        o.orderStatus === "shipped" ||
        o.orderStatus === "out_for_delivery"
    ).length,

    delivered: flattenedOrders.filter(
      (o) => o.orderStatus === "delivered"
    ).length,

    revenue: flattenedOrders.reduce(
      (acc, cur) => acc + cur.totalPrice,
      0
    ),
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-blue-100 text-blue-700";

      case "shipped":
        return "bg-purple-100 text-purple-700";

      case "out_for_delivery":
        return "bg-orange-100 text-orange-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handelStatusChange = async(orderId, newStatus)=>{
    
    const data = await UpdateStatusOnServer(orderId,newStatus);
    if(data.success){
      loadOrders();
    }
  }

  return (
    <section className="min-h-screen bg-zinc-100 py-28 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-10">

          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 mb-4 text-zinc-600 hover:text-black"
            >
              <FaArrowLeft />
              Back
            </button>

            <h1 className="text-5xl font-black">
              Orders Dashboard
            </h1>

            <p className="text-zinc-500 mt-2">
              Manage customer orders efficiently
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-3xl p-6 shadow">
            <FaClock className="text-3xl mb-3 text-yellow-500" />
            <p className="text-zinc-500">Pending Orders</p>
            <h2 className="text-4xl font-black">
              {stats.pending}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow">
            <FaTruck className="text-3xl mb-3 text-purple-500" />
            <p className="text-zinc-500">Shipped</p>
            <h2 className="text-4xl font-black">
              {stats.shipped}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow">
            <FaCheckCircle className="text-3xl mb-3 text-green-500" />
            <p className="text-zinc-500">Delivered</p>
            <h2 className="text-4xl font-black">
              {stats.delivered}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow">
            <FaBoxOpen className="text-3xl mb-3 text-blue-500" />
            <p className="text-zinc-500">Revenue</p>
            <h2 className="text-4xl font-black">
              ₹{stats.revenue.toFixed(2)}
            </h2>
          </div>

        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl p-5 shadow mb-8 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search order..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="flex-1 border rounded-xl px-4 py-3 outline-none"
          />

          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="out_for_delivery">
              Out For Delivery
            </option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

        </div>

        {/* Orders */}
        <div className="space-y-6">

          {filteredOrders.map((order) => (
            <div
              key={`${order.orderId}-${order.productId?._id}`}
              className="bg-white rounded-3xl shadow-lg p-6"
            >
              <div className="flex flex-col lg:flex-row gap-6">

                <img
                  src={order.image}
                  alt={order.title}
                  className="w-full lg:w-44 h-44 rounded-2xl object-cover"
                />

                <div className="flex-1">

                  <div className="flex justify-between flex-wrap gap-4">

                    <div>
                      <h2 className="text-2xl font-bold">
                        {order.title}
                      </h2>

                      <p className="text-zinc-500">
                        Order #{order.orderId}
                      </p>

                      <p className="text-sm text-zinc-400">
                        {new Date(
                          order.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusClass(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          order.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>

                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-5 mt-6">

                    <div className="bg-zinc-50 rounded-2xl p-4">
                      <h3 className="font-bold mb-3">
                        Customer
                      </h3>

                      <p className="flex items-center gap-2">
                        <FaUser />
                        {order.customer?.name}
                      </p>

                      <p className="mt-2">
                        {order.customer?.email}
                      </p>

                      <p className="flex items-center gap-2 mt-2">
                        <FaPhone />
                        {order.phoneNo}
                      </p>
                    </div>

                    <div className="bg-zinc-50 rounded-2xl p-4">
                      <h3 className="font-bold mb-3">
                        Product
                      </h3>

                      <p>Qty : {order.quantity}</p>
                      <p>Size : {order.size}</p>
                      <p>Color : {order.color}</p>
                      <p>Discount : {order.discount}%</p>
                    </div>

                    <div className="bg-zinc-50 rounded-2xl p-4">
                      <h3 className="font-bold mb-3">
                        Delivery Address
                      </h3>

                      <p>
                        {order.address}
                      </p>

                      <p>
                        {order.city} - {order.postalCode}
                      </p>
                    </div>

                  </div>

                  <div className="flex justify-between items-center flex-wrap gap-4 mt-6">

                    <div>
                      <h2 className="text-4xl font-black">
                        ₹{order.totalPrice}
                      </h2>
                    </div>

                    <select
                      value={order.orderStatus}
                      onChange={(event)=>handelStatusChange(order.orderId, event.target.value)}
                      className="border rounded-xl px-4 py-3"
                    >
                      <option value="pending">
                        Pending
                      </option>
                      <option value="confirmed">
                        Confirmed
                      </option>
                      <option value="shipped">
                        Shipped
                      </option>
                      <option value="out_for_delivery">
                        Out For Delivery
                      </option>
                      <option value="delivered">
                        Delivered
                      </option>
                      <option value="cancelled">
                        Cancelled
                      </option>
                    </select>
                  </div>

                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}