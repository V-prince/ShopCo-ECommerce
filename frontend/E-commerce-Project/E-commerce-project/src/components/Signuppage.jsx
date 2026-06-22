
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../Firebase.config";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore"
import { SignupPageDataSendToServer } from "../services/api";
import { Loading } from "./Loading";
export const Signuppage = () => {
    const [email, setemail] = useState("")
    const [mobile, setmobile] = useState("")
    const [password, setpass] = useState("")
    const [cpass, setcpass] = useState("")
    const [names, setnames] = useState("");
    const [image, setimage] = useState("");
    const [role, setrole] = useState("user");
    const [error, setError] = useState({})


    const handleonRagister = async (e) => {
        e.preventDefault();


        if (password == cpass) {
            try {
                const signupData = {
                    name: names,
                    email: email,
                    phoneNo: mobile,
                    password: password,
                    role: role,
                    imageUrl: image
                }
                const data = await SignupPageDataSendToServer(signupData)

                if (!data.success) {
                    if (data.errors) {
                        const fieldError = {}
                        data.errors.forEach((error) => {
                            fieldError[error.path] = error.msg
                        })
                        setError(fieldError)
                    }
                    else {
                        toast.error(data.msg)
                    }
                    return
                }
                if (data.success) {
                    <Loading />
                    window.location.href = "/login"
                    toast.success(data.message, { position: "top-center" })
                }
            }
            catch (error) {
                toast.error(error.message, { position: "top-center" });
            }
        }
        else {
            toast.error("Please Enter valid password!")
        }
    }



    let uploadImage = async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "image_upload_profile")
        formData.append("cloud_name", "dettol0do");
        try {
            if (image === null) {
                return toast.error("Please Upload Profile image!!")
            }

            const res = await fetch(`https://api.cloudinary.com/v1_1/dettol0do/image/upload`, {
                method: "POST",
                body: formData
            })
            let CloudData = await res.json();
            toast.success("Image Upload Success fully")
            return CloudData.secure_url
        }
        catch (error) {
            console.log(error.message);
        }
    }

    let handleonupload = async (e) => {
        let image = e.target.files[0];
        const imageurl = await uploadImage(image)
        setimage(imageurl)
    }


    return (
        <section className='max-w-[1400px] px-10 mx-auto mt-25 md:mt-35'>
            <div className="flex items-center flex-wrap">
                <div className="flex-1">
                    <form onSubmit={handleonRagister}>
                        <h1 className="md:text-6xl text-4xl font-extrabold py-2">Signup To Login</h1>
                        <hr className="text-zinc-500 my-10 md:w-[70%] w-full" />
                        <input type="text" placeholder="Name" value={names} className="border-1 bg-gray-200 text-zinc-600 p-4 rounded-xl md:w-[70%] w-full mb-5" onChange={(e) => {
                            setnames(e.target.value)
                            setError(prev => ({
                                ...prev,
                                name: "",
                            }))
                        }} required />

                        {
                            error.name ? <p className="text-red-500 text-sm mb-3 mt-1">
                                {error.name}
                            </p> : null
                        }


                        <input type="text" placeholder="Phone no" className="border-1 bg-gray-200 text-zinc-600 p-4 rounded-xl md:w-[70%] w-full mb-5" onChange={(e) => {
                            setmobile(e.target.value)
                            setError(prev => ({
                                ...prev,
                                phoneNo: ""
                            }))
                        }} />

                        {
                            error.phoneNo ? <p className="text-red-500 text-sm mb-3 mt-1">
                                {error.phoneNo}
                            </p> : null
                        }

                        <input type="email" placeholder="Email" className="border-1 bg-zinc-200 text-zinc-600 p-4 rounded-xl md:w-[70%] w-full mb-5" onChange={(e) => {
                            setemail(e.target.value)
                            setError(prev => ({
                                ...prev,
                                email: ""
                            }))
                        }} /> <br />

                        {
                            error.email ? <p className="text-red-500 text-sm mb-3 mt-1">
                                {error.email}
                            </p> : null
                        }

                        <input type="password" placeholder="Password" className="border-1 bg-gray-200 text-zinc-600 p-4 rounded-xl md:w-[70%] w-full mb-5" onChange={(e) => {
                            setpass(e.target.value)
                            setError(prev => ({
                                ...prev,
                                password: ""
                            }))
                        }} />

                        {
                            error.password ? <p className="text-red-500 text-sm mb-3 mt-1">
                                {error.password}
                            </p> : null
                        }

                        <input type="password" placeholder="Current Password" className="border-1 bg-gray-200 text-zinc-600 p-4 rounded-xl md:w-[70%] w-full mb-5" onChange={(e) => setcpass(e.target.value)} />


                        <select
                            className="border-1 bg-gray-200 text-zinc-600 p-4 rounded-xl md:w-[70%] w-full mb-5 outline-none"
                            value={role}
                            onChange={(e) => {
                                setrole(e.target.value)
                                setError(prev => ({
                                    ...prev,
                                    role: ""
                                }))
                            }}
                        >
                            <option value="user">User</option>
                            <option value="host">Host</option>
                        </select>

                        {
                            error.role ? <p className="text-red-500 text-sm mb-3 mt-1">
                                {error.role}
                            </p> : null
                        }

                        <input type="file" className="border-1 bg-gray-200 text-zinc-600 p-4 rounded-xl md:w-[70%] w-full" onChange={(e) => {
                            handleonupload(e)
                            setError(prev => ({
                                ...prev,
                                imageUrl: ""
                            }))
                        }} />

                        {
                            error.imageUrl ? <p className="text-red-500 text-sm mb-3 mt-1">
                                {error.imageUrl}
                            </p> : null
                        }

                        <div className="flex justify-between md:w-[30vw] mt-5">
                            <Link to="/login" className="font-bold">Already User?</Link>
                        </div>
                        <button className='bg-black font-bold text-white md:px-12 px-10 md:py-3 py-3 rounded-full mb-15 hover:bg-gradient-to-b md:w-[70%] w-full mt-10 to-zinc-700 from-zinc-900 hover:text-white hover:font-bold'>Signup Now</button>
                    </form>
                </div>
                <div className="md:flex-1">
                    <img src="/images/safe.jpg" />
                </div>
            </div>
        </section>
    )
}
