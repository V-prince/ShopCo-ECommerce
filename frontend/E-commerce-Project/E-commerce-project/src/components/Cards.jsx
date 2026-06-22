
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ShopAction } from "../store/Shope";
import { useEffect, useState } from "react";
import { auth } from "../Firebase.config";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { ShopItemsAction } from "../store/Shopitem";
export const Cards = ({ item, ratings }) => {
    if (!item) return null;

    const user = useSelector((state) => state.Shopdata.user);


    let fullstar = Math.floor(item.avgRatings)
    let halfstar = item.avgRatings % 1 !== 0;
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const finalprice = Math.floor(item.price - (item.price * item.discount) / 100)

    let id = item._id

    const handleonclick = () => {
        if (!user) {
            toast.error("Please Login after Access Product !!", { position: "top-center" })
            return;
        }
        navigate(`/Shop-items/${id}`)
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            dispatch(
                ShopItemsAction.setUser(user)
            )
        }
    }, [])

    return (
        <div onClick={handleonclick} className='flex flex-col md:max-w-[300px] mb-30 md:hover:scale-110 transation-all duration-150 overflow-hidden cursor-pointer`'>
            <img src={item.image} alt="" className='w-full h-[300px] object-cover rounded-3xl cursor-pointer hover:shadow-xl  hover:scale-100 transition-all duration-300"' />
            <h3 className='mt-3 text-xl font-bold'>{item.title}</h3>
            <div className='flex gap-2'>
                <span className='text-yellow-400 flex'>
                    {item.avgRatings > 0 ? (
                        <>

                            {
                                Array.from({ length: fullstar }, (_, index) => {
                                    return <BsStarFill key={index} />
                                })
                            }
                            {
                                Array.from({ length: halfstar }, (_, index) => {
                                    return <BsStarHalf key={index} />
                                })
                            }
                        </>
                    ) :
                        (Array.from({ length: 5 }, (_, index) => {
                            return <BsStar key={index} />
                        }))
                    }
                </span>
                <p className='text-zinc-400 text-[15px]'><span className='text-[15px]'>{Number.isInteger(item.avgRatings) ? item.avgRatings : item.avgRatings.toFixed(1)}</span>/5</p>
            </div>
            <div className='flex gap-3'>
                <h2 className='text-xl font-bold'>₹{finalprice}</h2>
                {item.discount > 0 && (<h2 className={`text-xl text-zinc-400 line-through font-bold `}>₹{item.price}</h2>)}
                {
                    item.discount > 0 && <div className='bg-red-100 px-4 flex items-center text-white rounded-full text-[9px]'>
                        <span className='text-red-400 font-bold'>
                            {item.discount}%
                        </span>
                    </div>
                }
            </div>
        </div>
    )
}
