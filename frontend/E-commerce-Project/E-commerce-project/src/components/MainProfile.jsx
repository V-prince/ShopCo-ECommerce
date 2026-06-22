import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ShopItemsAction } from "../store/Shopitem";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "./Loading";

export const MainProfile = () => {

  const dispatch = useDispatch();
  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    )

    if (user) {
      dispatch(
        ShopItemsAction.setUser(user)
      )
    }

  }, [])

  const userDetail = useSelector((state) => state.Shopdata.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(ShopItemsAction.logoutUser())
    toast.success("Logout Successfully!", { position: "top-center" })
    window.location.href = "/login"
  }

  if (!userDetail) {

    return (

      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>

    );

  }

  return (

    <div className="min-h-screen bg-[#f5f5f5] py-20 px-5">

      <div className="max-w-5xl mx-auto">

        {/* Card */}
        <div className="bg-white rounded-[35px] shadow-sm border border-gray-100 overflow-hidden">

          {/* Top Banner */}
          <div className="h-52 bg-black"></div>

          {/* Profile */}
          <div className="px-10 pb-10 relative">

            {/* Profile Image */}
            <div className="-mt-20 flex flex-col items-center">

              <img
                src={userDetail?.imageUrl}
                alt="profile"
                className="w-40 h-40 rounded-full border-[6px] border-white object-cover shadow-md"
              />

              <h1 className="text-4xl font-extrabold mt-5">
                {userDetail?.name}
              </h1>

              <p className="text-gray-500 mt-2">
                Welcome back 👋
              </p>

            </div>

            {/* Info */}
            <div className="grid md:grid-cols-2 gap-5 mt-12">

              {/* Email */}
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">

                <p className="text-gray-500 mb-2">
                  Email Address
                </p>

                <h2 className="text-lg font-bold break-all">
                  {userDetail?.email}
                </h2>

              </div>

              {/* Phone */}
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">

                <p className="text-gray-500 mb-2">
                  Phone Number
                </p>

                <h2 className="text-lg font-bold">
                  {userDetail?.phoneNo}
                </h2>

              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">

                <p className="text-gray-500 mb-2">
                  Role
                </p>

                <h2 className="text-lg font-bold capitalize">
                  {userDetail?.role}
                </h2>

              </div>

            </div>

            {/* Buttons */}
            <div className="flex gap-5 mt-10 flex-wrap">

              <button className="bg-black text-white px-10 py-4 rounded-full font-semibold hover:scale-[1.02] transition-all">

                Edit Profile

              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-10 py-4 rounded-full font-semibold hover:scale-[1.02] transition-all"
              >

                Logout

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};