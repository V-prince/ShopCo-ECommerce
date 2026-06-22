import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaShoppingBag,
  FaRupeeSign,
  FaUsers,
  FaExclamationTriangle,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { FetchAnaliticsData } from "../services/api";
import { useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import { Loading } from "./Loading";

export default function HostAnalytics() {

  const navigate = useNavigate()

  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);


  const stats = [
    {
      title: "Total Revenue",
      value: item.totalRevenue,
      icon: <FaRupeeSign />,
    },
    {
      title: "Total Orders",
      value: item.ordersCount,
      icon: <FaShoppingBag />,
    },
    {
      title: "Total Products",
      value: item.productsCount,
      icon: <FaBoxOpen />,
    }
  ];

  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

  const salesData = item.monthlySalary?.map(ms => (
    month ? {
      month: month[ms._id - 1],
      sales: ms.sales,
    } : null
  )) || [];


  const AnalyticsData = async () => {

    try {
      const data = await FetchAnaliticsData()
      setLoading(true)
      if (!data.success) {
        return toast.error(data.message)
      }
      setItem(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    AnalyticsData()
  }, [])



  return (
    <section className="min-h-screen mt-20 bg-zinc-100 p-6 md:p-10">


      {loading ? <Loading /> : (<>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-zinc-600 hover:text-black"
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="max-w-[1600px] mx-auto">

          {/* Header */}

          <div className="mb-10">

            <h1 className="text-5xl font-black">
              Host Analytics
            </h1>

            <p className="text-zinc-500 mt-2">
              Manage your store performance
            </p>

          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {stats.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-lg hover:-translate-y-1 transition-all"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-zinc-500">
                      {item.title}
                    </p>

                    <h2 className="text-4xl font-black mt-3">
                      <CountUp
                        start={0}
                        end={Number(item.value)}
                        duration={1.5}
                      />
                    </h2>

                  </div>

                  <div className="text-4xl">
                    {item.icon}
                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Charts */}

          <div className="grid lg:grid-cols-3 gap-6 mt-8">

            <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg">

              <h2 className="text-2xl font-bold mb-5">
                Revenue Analytics
              </h2>

              <div className="h-[350px]  outline-none">

                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>

                    <CartesianGrid strokeDasharray="4 4" />

                    <XAxis dataKey="month" />

                    <YAxis tickFormatter={(value) => `₹${value}`} />

                    <Tooltip formatter={(value) => [`₹${value}`, "Sales"]} />

                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#000"
                      strokeWidth={4}
                    />

                  </LineChart>
                </ResponsiveContainer>

              </div>

            </div>

            {/* Quick Stats */}

            <div className="bg-white rounded-3xl p-6 shadow-lg">

              <h2 className="text-2xl font-bold mb-6">
                Order Overview
              </h2>

              <div className="space-y-5">
                {item?.status?.map((overview) => (
                  <div className="flex justify-between capitalize">
                    <span>{overview._id}</span>
                    <span className="font-bold">
                      {overview.Total}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Bottom Grid */}

          <div className="grid lg:grid-cols-2 gap-6 mt-8">

            {/* Top Products */}

            <div className="bg-white rounded-3xl p-6 shadow-lg">

              <h2 className="text-2xl font-bold mb-6">
                Top Selling Products
              </h2>

              <div className="space-y-4">

                {item?.topSelling?.map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between bg-zinc-50 p-4 rounded-xl"
                  >

                    <span>{item._id}</span>

                    <span className="font-bold">
                      {item.topSelling} Sold
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* Low Stock */}
            {item?.lowStockProducts?.length > 0 &&
              (<>
                <div className="bg-white rounded-3xl p-6 shadow-lg">

                  <div className="flex items-center gap-3 mb-6">

                    <FaExclamationTriangle />

                    <h2 className="text-2xl font-bold">
                      Low Stock Alerts
                    </h2>

                  </div>

                  <div className="space-y-4">

                    {item?.lowStockProducts?.map((item, index) => (

                      <div
                        key={index}
                        className="bg-red-50 border border-red-200 p-4 rounded-xl flex justify-between"
                      >

                        <span>{item.productTitle} ({item.size}) ({item.color})</span>

                        <span className="font-bold text-red-600">
                          {item.stock} Left
                        </span>

                      </div>

                    ))}

                  </div>

                </div>
              </>)
            }

          </div>

          {/* Recent Orders */}

          <div className="bg-white rounded-3xl shadow-lg mt-8 overflow-hidden">

            <div className="p-6">

              <h2 className="text-2xl font-bold">
                Recent Orders
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-zinc-100">

                    <th className="text-left p-4">
                      Order ID
                    </th>

                    <th className="text-left p-4">
                      Customer
                    </th>

                    <th className="text-left p-4">
                      Amount
                    </th>

                    <th className="text-left p-4">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {item?.recentOrders?.map((order, index) => (

                    <tr
                      key={index}
                      className="border-t"
                    >

                      <td className="p-4">
                        #{order._id}
                      </td>

                      <td className="p-4">
                        {order?.userId?.name}
                      </td>

                      <td className="p-4">
                        {order.finalAmount}
                      </td>

                      <td className="p-4">

                        <span className="bg-zinc-200 px-4 py-1 rounded-full text-sm">

                          {order.orderStatus}

                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>


      </>)}


    </section>
  );
}