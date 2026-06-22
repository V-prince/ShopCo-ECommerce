import React, { useState } from 'react'
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { ShopAction } from '../store/Shope';
import { DeleteItemFromServer, IncrementAndDecrementCounterFromCart } from '../services/api';
import { toast } from 'react-toastify';
export const Cartcard = ({ item,FetchAllCart }) => {
    let dispatch = useDispatch();

    const SetConter = async(type)=>{

        let newCounter ;
        if(type === "increment"){
            newCounter = item.quantity + 1;
        }
        else{
            newCounter = item.quantity > 1 ? item.quantity - 1 : item.quantity;
        }
        const counterdata = await IncrementAndDecrementCounterFromCart(item.id,newCounter)

        console.log("counterdata",counterdata);
        await FetchAllCart()
    }

    let removeitem = async(item) => {
        const data = await DeleteItemFromServer(item.id)
        toast.success(data.message)
        await FetchAllCart()    
    }
    return (
        <>
            <div className='flex sm:justify-between md:justify-between md:gap-5 w-full md:h-35  mt-5'>
                <div className='flex md:gap-5 gap-2'>
                    <div className='flex'>
                        <img src={item.image} className='w-[100px] h-[99px] md:w-full md:h-full' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 className='font-extrabold md:text-lg text-[15px] w-full'>{item.title}</h1>
                        <div>
                            <h2 className='text-[10px] md:text-lg'>Size : <span className='text-zinc-400'>{item.size}</span></h2>
                            <h2 className='text-[10px] md:text-lg'>Color : <span className='text-zinc-400'>{item.color}</span></h2>
                        </div>
                        <h1 className='md:text-lg md:mt-2 font-bold'>₹{item.price}</h1>
                    </div>
                </div>
                <div className='flex flex-col items-end justify-between md:gap-5 '>
                    <button onClick={() => removeitem(item)} className='text-lg text-red-500 cursor-pointer'><AiFillDelete /></button>
                    <div className="flex items-center justify-between w-full md:w-[10vw] py-1 px-4 bg-zinc-300 rounded-4xl">
                        <button className="font-bold md:text-3xl w-5 cursor-pointer" onClick={()=>SetConter("=decrement")}>-</button>
                        <p className="md:text-xl transation-all duration-10">{item.quantity}</p>
                        <button className="font-bold md:text-3xl w-5 cursor-pointer" onClick={()=>SetConter("increment")}>+</button>
                    </div>
                </div>
            </div>
            <div className='flex w-full'>
                <hr className='w-full text-zinc-400 mt-10' />
            </div>

        </>

    )
}
