
import { Headings } from './Headings'

import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Cartcard } from './cartcard';
import { ShopAction } from '../store/Shope';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FetchallCartsDataFormServer } from '../services/api';
import { Link } from 'react-router-dom';
export const Carts = () => {

    let dispatch = useDispatch();
    const { id } = useParams()
    const [product, setProduct] = useState([])

    localStorage.setItem('selecteditem', JSON.stringify(product))
    dispatch(ShopAction.ShopItems(product))


    const FetchAllCart = async () => {
        const data = await FetchallCartsDataFormServer()
        setProduct(data)
    }

    useEffect(() => {
        FetchAllCart()
    }, [])

    let total = 0;
    let subtotal = 0;
    let discount = 0;
    let discountpercentage = 0;

    

    product.forEach(item => {
        subtotal += item.price * item.quantity;
        discount += (item.discount * item.price) / 100 * item.quantity;
        discountpercentage += item.discount;
        subtotal = Math.floor(subtotal);
        discount = Math.floor(discount);
    })


    total += product.length == 0 ? 0 : subtotal - discount + 15;

    return (
        <div className='max-w-[1400px] mb-10 px-10 md:mx-auto mt-40 '>
            <div className='mr-auto w-fit mb-10'>
                <Headings content="Your Cart" />
            </div>
            {product.length !== 0 ? (
                <div className='flex md:flex-row  flex-col  gap-5'>
                    <div className='flex flex-col border-1 rounded-3xl border-zinc-500  w-full  md:w-[50vw] p-5'>
                        {
                            product.map(item => (
                                <Cartcard item={item} key={item.id} FetchAllCart={FetchAllCart} />
                            ))
                        }

                    </div>
                    <div className='flex-1'>

                        <div className=' border-1 rounded-3xl border-zinc-500 p-4'>
                            <div className='mr-auto w-fit mb-10'>
                                <h1 className='text-2xl font-bold'>Order Summay</h1>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex flex-col gap-3'>
                                    <h1 className='md:text-lg '>Subtotal</h1>
                                    <h1 className='md:text-lg '>Discount (-{discountpercentage}%)</h1>
                                    <h1 className='md:text-lg '>Delivery Fee</h1>
                                </div>
                                <div className='flex flex-col gap-3'>
                                    <h1 className='md:text-lg font-bold'>₹{subtotal}</h1>
                                    <h1 className='md:text-lg text-red-500'>-₹{discount}</h1>
                                    <h1 className='md:text-lg font-bold mb-5'>₹15</h1>
                                </div>
                            </div>
                            <hr className='text-zinc-400' />
                            <div className='flex justify-between my-5'>
                                <h1 className='text-2xl font-semibold '>Total</h1>
                                <h1 className='text-2xl font-bold '>₹{total}</h1>
                            </div>

                            <div className='flex items-center justify-center w-full gap-4 bg-black text-white text-center py-3 rounded-3xl'>
                                <Link to="/checkout" className='text-white no-underline'>
                                    Go to Checkout
                                </Link>
                                <span className='text-center'><FaArrowRightLong /></span>
                            </div>
                        </div>
                    </div>
                </div>
            )
                : (<p className='text-center text-2xl font-bold mb-30'>Your Cart is Empty</p>)}
        </div>
    )
}
