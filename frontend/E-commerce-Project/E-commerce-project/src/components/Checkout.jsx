import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BsCreditCard2Front } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FetchallCartsDataFormServer, razorpayCreateOrder, razorpayVerifyPayment } from "../services/api";
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux";
import { ShopAction } from "../store/Shope";
import { ShopItemsAction } from "../store/Shopitem";
import { Loading } from "../components/Loading"

export const Checkout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(
        (state) => state.Shopdata.user
    )

    const [detail, setDetail] = useState({
        phoneNo: "",
        address: "",
        city: "",
        postalCode: "",
    })

    const [payment, setPayment] = useState("card");
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false)



    const handleDetails = (e) => {
        const name = e.target.name
        const value = e.target.value

        setDetail((prev) => ({
            ...prev,
            [name]: value
        }))

    }
    const clearForm = () => {
        setDetail({
            phoneNo: "",
            address: "",
            city: "",
            postalCode: "",
        });
    };

    const handlePayment = async () => {

        if (loading) return;

        setLoading(true)

        try {
            if (!detail.phoneNo || !detail.address || !detail.city || !detail.postalCode) {
                setLoading(false)

                return toast.error("Please fill all the details")
            }

            if (payment === "cod") {
                const orderData = {
                    ...detail,
                    paymentMethod: payment,
                }

                const data = await razorpayVerifyPayment(orderData)
                setLoading(true)

                if (!data.success) {
                    toast.error(data.message)
                }
                else {
                    toast.success(data.message)
                    navigate("/user/myorders")
                }
                return;
            }

            const order = await razorpayCreateOrder()

            if (!order.success) {
                return toast.error(order.message)
            }

            const options = {
                key: order.razorpayKey,
                amount: order.order.amount,
                currency: order.order.currency,
                name: "Shop.Co",
                description: "Thish is a test transaction",
                order_id: order.order.id,
                prefill: {
                    name: user?.name,
                    email: user?.email,
                    contact: user?.phoneNo
                },
                handler: async (res) => {
                    const orderData = {
                        ...detail,
                        razorpay_order_id: res.razorpay_order_id,
                        razorpay_payment_id: res.razorpay_payment_id,
                        razorpay_signature: res.razorpay_signature,
                        paymentMethod: payment,
                    }
                    const verify = await razorpayVerifyPayment(orderData)
                    if (verify.success) {
                        toast.success(verify.message)
                        clearForm();
                        navigate("/user/myorders");

                    }
                    else {
                        toast.error(verify.message)
                    }
                },
                theme: {
                    color: "#000"
                }
            }

            const rzp1 = new Razorpay(options);
            rzp1.open();
        } finally {
            setLoading(false)
        }

    }


    const fetchCartItems = async () => {
        const cartData = await FetchallCartsDataFormServer();
        if (!cartData) {
            return toast.error(cartData.message)
        }
        setCartItems(cartData)
    }

    useEffect(() => {
        fetchCartItems()

        const user = JSON.parse(
            localStorage.getItem("user")
        )

        if (user) {
            dispatch(
                ShopItemsAction.setUser(user)
            )
        }

        if (user?.phoneNo) {
            setDetail((prev) => ({
                ...prev,
                phoneNo: user.phoneNo.toString(),
            }))
        }
    }, [])


    let total = 0;
    let subtotal = 0;
    let discount = 0;
    let discountpercentage = 0;



    cartItems.forEach(item => {
        subtotal += item.price * item.quantity;
        discount += (item.discount * item.price) / 100 * item.quantity;
        discountpercentage += item.discount;
        subtotal = Math.floor(subtotal);
        discount = Math.floor(discount);
    })


    total += cartItems.length == 0 ? 0 : subtotal - discount + 15;


    return (

        <section className="min-h-screen bg-[#f5f5f5] py-30 px-5">

            <div className="max-w-[1400px] mx-auto">

                {loading ? <Loading /> : (
                    <>
                        <div className="flex items-center gap-4 mb-10">

                            <Link
                                to="/Carts"
                                className="bg-white p-4 rounded-full shadow-md hover:scale-105 transition-all duration-300"
                            >
                                <FaArrowLeft />
                            </Link>

                            <div>

                                <h1 className="text-5xl font-extrabold">
                                    Checkout
                                </h1>

                                <p className="text-zinc-500 mt-2">
                                    Complete your order securely
                                </p>

                            </div>

                        </div>


                        <div className="grid lg:grid-cols-3 gap-8">


                            <div className="lg:col-span-2 bg-white rounded-[35px] p-8 shadow-lg border border-zinc-200">


                                <div>

                                    <h2 className="text-3xl font-bold mb-6">
                                        Shipping Details
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-5">

                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            disabled={user ? "true" : "false"}
                                            value={user ? user.name : ""}
                                            className={`border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:border-black ${user && 'bg-gray-200 font-semibold'}`}
                                        />



                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            disabled={user ? "true" : "false"}
                                            value={user ? user.email : ""}
                                            className={`border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:border-black ${user && 'bg-gray-200 font-semibold'}`}
                                        />

                                        <input
                                            type="text"
                                            placeholder="Phone Number"
                                            disabled={user ? true : false}
                                            name="phoneNo"
                                            value={user?.phoneNo || detail.phoneNo}
                                            onChange={(e) => handleDetails(e)}
                                            className={`border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:border-black md:col-span-2 ${user && 'bg-gray-200 font-semibold'}`}
                                        />

                                        <input
                                            type="text"
                                            name="address"
                                            onChange={(e) => handleDetails(e)}
                                            value={detail.address}
                                            placeholder="Address"
                                            className="border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:border-black md:col-span-2"
                                        />

                                        <input
                                            type="text"
                                            onChange={(e) => handleDetails(e)}
                                            name="city"
                                            value={detail.city}
                                            placeholder="City"
                                            className="border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:border-black"
                                        />

                                        <input
                                            type="text"
                                            onChange={(e) => handleDetails(e)}
                                            maxLength={6}
                                            name="postalCode"
                                            value={detail.postalCode}
                                            placeholder="Postal Code"
                                            className="border border-zinc-300 rounded-2xl px-5 py-4 outline-none focus:border-black"
                                        />

                                    </div>

                                </div>

                                {/* Payment */}
                                <div className="mt-12">

                                    <h2 className="text-3xl font-bold mb-6">
                                        Payment Method
                                    </h2>

                                    <div className="flex flex-col gap-4">

                                        <button
                                            onClick={() => setPayment("card")}
                                            className={`flex items-center justify-between border rounded-2xl px-5 py-5 transition-all duration-300
                                    
                                    ${payment === "card"
                                                    ? "border-black bg-black text-white"
                                                    : "border-zinc-300 bg-white text-black"
                                                }`}
                                        >

                                            <div className="flex items-center gap-4">

                                                <BsCreditCard2Front className="text-2xl" />

                                                <div className="text-left">

                                                    <h1 className="font-bold">
                                                        Credit / Debit Card
                                                    </h1>

                                                    <p className="text-sm opacity-70">
                                                        Pay securely using card
                                                    </p>

                                                </div>

                                            </div>

                                            <div
                                                className={`h-5 w-5 rounded-full border-2 
                                        
                                        ${payment === "card"
                                                        ? "border-white bg-white"
                                                        : "border-zinc-400"
                                                    }`}
                                            ></div>

                                        </button>

                                        <button
                                            onClick={() => setPayment("cod")}
                                            className={`flex items-center justify-between border rounded-2xl px-5 py-5 transition-all duration-300
                                    
                                    ${payment === "cod"
                                                    ? "border-black bg-black text-white"
                                                    : "border-zinc-300 bg-white text-black"
                                                }`}
                                        >

                                            <div>

                                                <h1 className="font-bold text-left">
                                                    Cash On Delivery
                                                </h1>

                                                <p className="text-sm opacity-70">
                                                    Pay after receiving order
                                                </p>

                                            </div>

                                            <div
                                                className={`h-5 w-5 rounded-full border-2 
                                        
                                        ${payment === "cod"
                                                        ? "border-white bg-white"
                                                        : "border-zinc-400"
                                                    }`}
                                            ></div>

                                        </button>

                                    </div>

                                </div>

                            </div>


                            <div className={`bg-white rounded-[35px] p-8 shadow-lg border border-zinc-200 h-fit sticky top-28 `}>

                                <h1 className="text-3xl font-extrabold mb-8">
                                    Order Summary
                                </h1>

                                <div className={`${cartItems.length > 3 ? "max-h-[400px] overflow-y-auto pr-2" : ""}`}>



                                    {cartItems.map((item) => (


                                        <div className={`flex gap-4 items-center border-b border-zinc-200 pb-5`} key={item.id}>

                                            <img
                                                src={item.image}
                                                alt=""
                                                className="w-24 h-24 rounded-2xl object-cover"
                                            />

                                            <div>

                                                <h1 className="font-bold text-lg">
                                                    {item.title}
                                                </h1>

                                                <p className="text-zinc-500 text-sm mt-1">
                                                    Size :{item.size}
                                                </p>

                                                <p className="text-zinc-500 text-sm">
                                                    Color :{item.color}
                                                </p>

                                                <h2 className="font-extrabold text-xl mt-2">
                                                    ₹{item.price}
                                                </h2>

                                            </div>

                                        </div>


                                    ))}

                                </div>



                                <div className="space-y-5 mt-8">

                                    <div className="flex items-center justify-between">

                                        <p className="text-zinc-500">
                                            Subtotal
                                        </p>

                                        <h1 className="font-bold">
                                            ₹{subtotal}
                                        </h1>

                                    </div>

                                    <div className="flex items-center justify-between">

                                        <p className="text-zinc-500">
                                            Discount (-{discountpercentage}%)
                                        </p>

                                        <h1 className="font-bold text-green-600">
                                            - ₹{discount}
                                        </h1>

                                    </div>

                                    <div className="flex items-center justify-between">

                                        <p className="text-zinc-500">
                                            Delivery Fee
                                        </p>

                                        <h1 className="font-bold">
                                            ₹15
                                        </h1>

                                    </div>

                                    <div className="border-t border-zinc-200 pt-5 flex items-center justify-between">

                                        <h1 className="text-2xl font-extrabold">
                                            Total
                                        </h1>

                                        <h1 className="text-3xl font-extrabold">
                                            ₹{total}
                                        </h1>

                                    </div>

                                </div>


                                <button
                                    onClick={handlePayment}
                                    className="w-full bg-black text-white py-5 rounded-full mt-10 text-lg font-bold hover:bg-zinc-800 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                                >
                                    Place Order
                                </button>

                            </div>

                        </div>


                    </>
                )}


            </div>

        </section>

    );

};