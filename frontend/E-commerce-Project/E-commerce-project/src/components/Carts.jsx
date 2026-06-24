import { Headings } from './Headings';
import { FaArrowRightLong } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { Cartcard } from './cartcard';
import { ShopAction } from '../store/Shope';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FetchallCartsDataFormServer } from '../services/api';
import { motion } from "framer-motion";
import { Loading } from "./Loading";

export const Carts = () => {

    const dispatch = useDispatch();

    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    const FetchAllCart = async () => {
        try {
            setLoading(true);

            const data = await FetchallCartsDataFormServer();
            setProduct(data || []);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        FetchAllCart();
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "selecteditem",
            JSON.stringify(product)
        );

        dispatch(ShopAction.ShopItems(product));
    }, [product, dispatch]);

    let subtotal = 0;
    let discount = 0;
    let discountpercentage = 0;

    product.forEach(item => {
        subtotal += item.price * item.quantity;
        discount +=
            ((item.discount * item.price) / 100) *
            item.quantity;

        discountpercentage += item.discount;
    });

    subtotal = Math.floor(subtotal);
    discount = Math.floor(discount);

    const total =
        product.length === 0
            ? 0
            : subtotal - discount + 15;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[1400px] mb-10 px-10 md:mx-auto mt-40"
        >
            <div className="mr-auto w-fit mb-10">
                <Headings content="Your Cart" />
            </div>

            {loading ? (
                <Loading />
            ) : product.length !== 0 ? (
                <div className="flex md:flex-row flex-col gap-5">

                    
                    <div className="flex flex-col border rounded-3xl border-zinc-500 w-full md:w-[50vw] p-5">
                        {product.map((item, index) => (
                            <motion.div
                                key={item._id || item.id}
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                }}
                            >
                                <Cartcard
                                    item={item}
                                    FetchAllCart={FetchAllCart}
                                />
                            </motion.div>
                        ))}
                    </div>

                   
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                        }}
                        className="flex-1"
                    >
                        <div className="border rounded-3xl border-zinc-500 p-4">
                            <div className="mr-auto w-fit mb-10">
                                <h1 className="text-2xl font-bold">
                                    Order Summary
                                </h1>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex flex-col gap-3">
                                    <h1 className="md:text-lg">
                                        Subtotal
                                    </h1>

                                    <h1 className="md:text-lg">
                                        Discount (-{discountpercentage}%)
                                    </h1>

                                    <h1 className="md:text-lg">
                                        Delivery Fee
                                    </h1>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h1 className="md:text-lg font-bold">
                                        ₹{subtotal}
                                    </h1>

                                    <h1 className="md:text-lg text-red-500">
                                        -₹{discount}
                                    </h1>

                                    <h1 className="md:text-lg font-bold mb-5">
                                        ₹15
                                    </h1>
                                </div>
                            </div>

                            <hr className="text-zinc-400" />

                            <div className="flex justify-between my-5">
                                <h1 className="text-2xl font-semibold">
                                    Total
                                </h1>

                                <h1 className="text-2xl font-bold">
                                    ₹{total}
                                </h1>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex items-center justify-center w-full gap-4 bg-black text-white text-center py-3 rounded-3xl cursor-pointer"
                            >
                                <Link
                                    to="/checkout"
                                    className="text-white no-underline"
                                >
                                    Go to Checkout
                                </Link>

                                <FaArrowRightLong />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-2xl font-bold mb-30"
                >
                    Your Cart is Empty
                </motion.p>
            )}
        </motion.div>
    );
};