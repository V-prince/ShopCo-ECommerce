import { FcGoogle } from "react-icons/fc";
import { FaBullseye, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, provider, provider2 } from "../Firebase.config";
import { useDispatch } from "react-redux";
import { ShopItemsAction } from "../store/Shopitem";
import { LoginPageDataSendToServer, verifyOtpForLogin } from "../services/api";
import { Loading } from "./Loading";

export const Loginpage = () => {


    let nevigate = useNavigate()
    const dispatch = useDispatch()

    let [email, setemail] = useState("");
    let [pass, setpass] = useState("");


    const [showOtp, setShowOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {

            setLoading(true)
            const LoginData = {
                email,
                password: pass,
            }


            const data = await LoginPageDataSendToServer(LoginData)

            if (!data.success) {
                toast.error(data.message, { position: "top-center" })
                return;
            }
            toast.success(data.message, { position: "top-center" })
            setShowOtp(true);

        }
        catch (error) {
            toast.error("Please Enter valid password!")
        }
        finally {
            setLoading(false); // Loader Stop
        }
    }

    const handelOtpVerification = async () => {

        if (otp.length !== 6) {
            return toast.error("Enter valid 6 digit OTP");
        }

        const data = await verifyOtpForLogin(email, otp)

        if (!data.success) {
            return toast.error(data.message, { position: "top-center" });
        }

        setShowOtp(false);

        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))


        dispatch(ShopItemsAction.setUser(data.user))
        toast.success(data.message, { position: "top-center" })

        window.location.href = "/";
    }

    const handlegoogleLogin = async () => {
        try {
            const Auth = await signInWithPopup(auth, provider);

        }
        catch (error) {
            console.log(error.message);
        }
    }


    const facebookLogin = async () => {
        try {
            await signInWithPopup(auth, provider2)
        } catch (error) {
            console.log(error.message);
        }
    }

    const forgotpassword = async () => {
        if (!email) {
            toast.error("PLease Enter a Email!!");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password Change link is Send Your Email")
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <section className='max-w-[1400px] px-10 mx-auto mt-25 md:mt-35'>
            <div className="flex items-center flex-wrap">
                <div className="flex-1">

                    <form onSubmit={handlesubmit}>
                        <h1 className="md:text-6xl text-4xl font-extrabold py-2">Login To continue</h1>
                        <p className="text-lg text-zinc-500 mt-2 mb-3 md:mt-5 md:mb-10">Welcomeback Please Login</p>
                        <div className="flex gap-10">
                            <div className=" border-1 md:py-3 py-2 md:px-5 px-4 rounded-full text-zinc-600 font-bold">
                                <button type="button" onClick={facebookLogin} className=" flex items-center gap-2 text-lg text-black font-bold">
                                    <span className="text-blue-700"><FaFacebook /></span>Facebook</button>
                            </div>
                            <div className="border-1 py-3 px-5 rounded-full text-zinc-600 font-bold">
                                <button type="button" onClick={handlegoogleLogin} className="flex items-center gap-2 text-lg text-black font-bold"><FcGoogle /> Google</button>
                            </div>
                        </div>
                        <hr className="text-zinc-500 my-10 md:w-[70%] w-full" />
                        {loading ? <Loading /> : !showOtp ? (
                            <>
                                <input onChange={(e) => setemail(e.target.value)} type="text" placeholder="Email" className="border-1 bg-zinc-200 text-zinc-600 p-4 rounded-xl md:w-[70%] w-full mb-5" /> <br />

                                <input onChange={(e) => setpass(e.target.value)} type="password" placeholder="Password" className="border-1 bg-gray-200 text-zinc-600 p-4 rounded-xl md:w-[70%] w-full" />



                                <div className="flex justify-between md:w-[30vw] mt-5">
                                    <Link to="/Signup" className="font-bold">New User?</Link>
                                    <Link to="/auth/login/forgotpassword" className="font-bold">Forgot Password</Link>
                                </div>

                                <button className='bg-black font-bold text-white md:px-12 px-10 md:py-3 py-3 rounded-full mb-15 hover:bg-gradient-to-b md:w-[70%] w-full mt-10 to-zinc-700 from-zinc-900 hover:text-white hover:font-bold cursor-pointer'>Login Now</button></>) : <div className="mt-5 md:w-[70%] w-full">

                            <h2 className="text-3xl font-extrabold mb-2">
                                Verify OTP
                            </h2>

                            <p className="text-zinc-500 mb-6">
                                We've sent a verification code to your email address.
                                Enter the 6-digit OTP below to continue.
                            </p>

                            <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                maxLength={6}
                                onChange={(e) => setOtp(e.target.value)}
                                className="border bg-zinc-200 text-zinc-700 p-4 rounded-xl w-full text-center text-xl font-bold tracking-[0.4rem] outline-none focus:border-black"
                            />

                            <button
                                type="button"
                                onClick={handelOtpVerification}
                                className="bg-black text-white py-4 rounded-xl mt-5 w-full font-bold hover:bg-zinc-800 transition-all duration-300 cursor-pointer"
                            >
                                Verify OTP
                            </button>

                            <p className="text-zinc-500 text-sm mt-4 text-center">
                                Didn't receive the code?
                                <button
                                    type="button"
                                    className="ml-1 text-black font-bold hover:underline cursor-pointer"
                                >
                                    Resend OTP
                                </button>
                            </p>

                        </div>
                        }
                    </form>
                </div>
                <div className="md:flex-1">
                    <img src="/images/safe.jpg" />
                </div>
            </div>
        </section>

    )
}



