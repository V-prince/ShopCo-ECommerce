import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { FaArrowLeft, FaCheck, FaLessThanEqual } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { toast } from "react-toastify";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../Firebase.config";
import { useNavigate, useParams } from "react-router-dom";
import { ShopAction } from "../store/Shope";
import { FetchOneDataFromServer, getAllRatingsFromServer, PostAddCartDataToServer, postAddRatingToDataBase } from "../services/api";
import { motion } from "framer-motion";
import { Loading } from "./Loading";

export const Shop = () => {

    let dispetch = useDispatch();
    let nevigate = useNavigate();

    const { id } = useParams();

    let [counter, setcounter] = useState(1);
    let [csize, setcsize] = useState("")
    let [inrating, setinrating] = useState(0)
    let [showrating, setshowraing] = useState(false)
    let [scolor, setcolor] = useState("")
    let [textarea, settextarea] = useState("")
    let [show, setshow] = useState(true)
    let [showreview, setshowreview] = useState([])
    let [sort, setsort] = useState("latest")
    let [fetchedItem, setfetchedItem] = useState(null)




    const sendcart = async (fetchedItem) => {

        if (!fetchedItem || !fetchedItem.id) {
            toast.error("Product not found!");
            return;
        }

        if (!scolor) {
            toast.error("Please select a color!");
            return;
        }

        if (!csize) {
            toast.error("Please select a size!");
            return;
        }

        if (counter > availableStocks) {
            toast.error("Out of Stock")
            return
        }
        if (counter < 1) {
            toast.error("Quantity must be at least 1!");
            return;
        }

        let cartItems = {
            id: fetchedItem.id,
            title: fetchedItem.title,
            image: fetchedItem.image,
            price: fetchedItem.price,
            discount: fetchedItem.discount,
            counter: counter || 1,
            ssize: csize,
            scolor: scolor,
            stock: availableStocks
        }

        const SendCartDataToServer = {
            productId: fetchedItem.id,
            size: csize,
            color: scolor,
            quantity: counter || 1
        }

        await PostAddCartDataToServer(SendCartDataToServer)

        dispetch(ShopAction.ShopItems(cartItems))
        nevigate(`/Carts/${id}`)

    }

    const items = useSelector((state) => state.Shopitem.selecteditem)


    const handleonclick = async (e) => {
        e.preventDefault();
        if (!inrating) {
            toast.error("Please Enter Rating")
            return
        }
        if (!textarea) {
            toast.error("Please Enter Comment")
            return
        }

        const ratingData = {
            productId: id,
            rating: inrating,
            comment: textarea
        }

        const data = await postAddRatingToDataBase(ratingData)

        if (!data.success) {
            return toast.error(data.message)
        }

        await getAllRatings();

        setinrating(0)

        settextarea("")
        setshowraing(false)
    }



    const ProductData = async () => {
        const data = await FetchOneDataFromServer(id)
        setfetchedItem(data)
        console.log("selected", data)
    }

    const getAllRatings = async () => {
        const data = await getAllRatingsFromServer(id, sort)
        setshowreview(data.ratings)
    }


    useEffect(() => {
        ProductData()
        getAllRatings()
    }, [id, sort])


    if (!fetchedItem) {
        return (
            <Loading/>
        );
    }



    const selectedVariantation = fetchedItem?.variations?.find(variation => variation.color === scolor && variation.size === csize)

    const availableStocks = csize ? selectedVariantation?.stock || 0 : ""



    let fullstar = Math.floor(fetchedItem.avgRating)
    let halfstar = fetchedItem.avgRating % 1 !== 0

    const finalPrice = fetchedItem.price - (fetchedItem.price * fetchedItem.discount) / 100

    const Sizes = [...new Set(fetchedItem?.variations?.filter(item => item.color === scolor)?.map(variation => variation.size))]

    const Color = [...new Set(fetchedItem?.variations?.map(variation => variation.color))]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="max-w-[1400px] mx-auto mt-25 md:mt-45">
                <button
                    onClick={() => nevigate("/")}
                    className="flex items-center gap-2 text-black font-medium mb-3 cursor-pointer"
                >
                    <FaArrowLeft />
                    Back
                </button>
                <div className="flex items-center justify-center flex-wrap px-5">
                    <div className="md:flex-1 flex flex-col  justify-center items-center w-full">

                        <div className="w-full max-w-[500px] h-[500px] bg-gray-100 rounded-[30px] shadow-2xl overflow-hidden flex items-center justify-center">
                            <img
                                src={fetchedItem.image}
                                alt="t-shirt"
                                className="w-full h-full  object-cover scale-110 hover:scale-125 transition-all duration-300"
                            />
                        </div>
                    </div>

                    <div className="md:flex-1">
                        <h1 className='mt-5 md:text-5xl font-extrabold uppercase text-2xl'>{fetchedItem.title}</h1>
                        <div className="flex items-center gap-2 my-3">
                            <span className='text-yellow-400 text-2xl flex gap-3'>
                                {fetchedItem.avgRating > 0 ? (
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
                            <p>{Number.isInteger(fetchedItem.avgRating) ? fetchedItem.avgRating : fetchedItem.avgRating.toFixed(1)}/5</p>
                        </div>
                        <div className="flex gap-4">
                            <h2 className='text-xl font-bold'>₹{finalPrice.toFixed(0)}</h2>
                            {fetchedItem.discount > 0 && <h2 className={`text-xl text-zinc-400 line-through font-bold `}>₹{fetchedItem.price}</h2>}
                            {fetchedItem.discount > 0 && <div className='bg-red-100 px-4 flex items-center text-white rounded-full text-[9px]'>
                                <span className='text-red-400 text-lg font-bold'>
                                    {fetchedItem.discount}%
                                </span>
                            </div>}
                        </div>
                        <p className="text-zinc-500 my-4">{fetchedItem.description}</p>
                        <hr className="text-zinc-500 my-4" />
                        <p className="text-zinc-400 font-semibold">Select Color</p>
                        <div className="flex gap-2">
                            {
                                Color.map((color, index) => (
                                    <div onClick={() => {
                                        setcolor(color)
                                        setcsize("")
                                    }} key={index} className=" h-10 w-10 rounded-full shadow-xl border-2 border-zinc-400 hover:bg-black flex items-center justify-center text-zinc-300 " style={{ backgroundColor: color }} title={color}>{scolor === color && <FaCheck />}</div>
                                ))
                            }
                        </div>
                        <hr className="text-zinc-500 my-4" />
                        <p className="text-zinc-500 font-semibold my-4">Choise Size</p>
                        {
                            Sizes?.map((size, index) => (
                                <span onClick={() => setcsize(size)} className={`${csize == size ? "bg-black text-white font-bold" : "bg-zinc-300"} py-2 px-2 md:py-3 md:px-4 mr-[10px] w-full rounded-3xl`} key={index}>{size}</span>
                            ))
                        }
                        <div className="flex gap-4 items-center my-7">
                            <div className="flex items-center justify-between w-full md:w-[10vw] py-1 px-4 bg-zinc-300 rounded-4xl">
                                <button className="font-bold text-3xl w-5 cursor-pointer" onClick={() => setcounter(prev => prev > 1 ? prev - 1 : 0)}>-</button>
                                <p className="text-xl transation-all duration-10">{counter}</p>
                                <button className="font-bold text-3xl w-5 cursor-pointer" onClick={() => setcounter(prev => prev + 1)}>+</button>
                            </div>
                            <button disabled={availableStocks === 0} onClick={() => {

                                if (!fetchedItem) {
                                    toast.error("Product not found!");
                                    return;
                                }
                                sendcart(fetchedItem);

                            }} className="bg-black text-white font-bold py-2 md:w-[30vw] rounded-3xl w-full ">{availableStocks === 0 ? "OUt Of Stock" : "Add To Cart"}</button>
                        </div>
                    </div>

                </div>
                <h2 className="text-center mt-20 mb-5 font-semibold text-lg">Rating and Reviews</h2>
                <hr className=" text-zinc-500" />


                <div className="mt-10 flex justify-between items-center px-5 ">
                    <div className="flex md:gap-2">
                        <h2 className="md:text-xl font-bold" >All Reviews</h2>
                        <span className="md:text-xl text-zinc-500">({showreview.length})</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-3">
                        <div className="bg-zinc-500 md:py-2 md:px-4 px-1 py-2  rounded-3xl">
                            <select name="latest" className="md:text-lg  outline-none md:w-20" onChange={(e) => setsort(e.target.value)}>
                                <option value="latest" className="md:text-lg outline-none bg-zinc-500 border-none">Latest</option>
                                <option value="old" className="md:text-lg outline-none bg-zinc-500 border-none">Old</option>
                            </select>
                        </div>
                        <div className="bg-black text-white font-bold rounded-full py-2 px-2 md:px-5 w-full">
                            <button onClick={
                                () => setshowraing(prev => !prev)
                            }>Write a Review</button>
                        </div>
                    </div>
                </div>

                <div className="relative">

                    <div
                        className={`grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 px-10 transition-all duration-300 ${!show ? "max-h-[99vh] overflow-hidden" : ""
                            }`}
                    >
                        {showreview.length > 0 ? (
                            showreview.map((review) => (
                                <div
                                    key={review._id}
                                    className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between min-h-[280px]"
                                >
                                    <div>
                                        {/* User Info */}
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={
                                                    review.userId?.imageUrl ||
                                                    "https://ui-avatars.com/api/?name=User"
                                                }
                                                alt={review.userId?.name}
                                                className="w-12 h-12 rounded-full object-cover border"
                                            />

                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-lg">
                                                        {review.userId?.name}
                                                    </h3>

                                                    <MdVerified className="text-green-600 text-lg" />
                                                </div>

                                                <p className="text-xs text-zinc-500">
                                                    Verified Purchase
                                                </p>
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 text-yellow-400 mt-4">
                                            {Array.from(
                                                { length: Math.floor(review.rating) },
                                                (_, index) => (
                                                    <BsStarFill key={index} />
                                                )
                                            )}
                                        </div>

                                        {/* Comment */}
                                        <p className="text-zinc-700 mt-4 leading-relaxed break-words">
                                            {review.comment}
                                        </p>
                                    </div>

                                    {/* Date */}
                                    <div className="mt-5 text-sm text-zinc-500">
                                        {new Date(review.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex justify-center items-center py-20">
                                <p className="text-3xl font-bold text-zinc-500">
                                    No Reviews Yet!
                                </p>
                            </div>
                        )}
                    </div>

                    <form
                        onSubmit={handleonclick}
                        className={`flex flex-col gap-5 p-8 bg-white/80 backdrop-blur-xl 
    shadow-2xl border border-zinc-200 md:w-[450px] w-[95%] 
    rounded-[35px] absolute top-10 left-1/2 -translate-x-1/2
    transition-all duration-300 z-40

    ${showrating
                                ? "opacity-100 scale-100 pointer-events-auto"
                                : "opacity-0 scale-90 pointer-events-none"
                            }`}
                    >

                        {/* Heading */}
                        <div className="text-center">

                            <h1 className="text-4xl font-extrabold text-zinc-900">
                                Write Review
                            </h1>

                            <p className="text-zinc-500 mt-2">
                                Share your experience with this product
                            </p>

                        </div>


                        <div className="flex items-center justify-center gap-3 py-2">

                            {
                                [1, 2, 3, 4, 5].map((star) => (

                                    <span
                                        key={star}
                                        onClick={() => setinrating(star)}
                                        className="cursor-pointer text-3xl transition-all duration-200 hover:scale-125"
                                    >

                                        {
                                            star <= inrating
                                                ? <BsStarFill className="text-yellow-400 drop-shadow-md" />
                                                : <BsStar className="text-zinc-400 hover:text-yellow-300" />
                                        }

                                    </span>

                                ))
                            }

                        </div>


                        <div className="flex flex-col gap-2">

                            <label className="font-semibold text-zinc-700">
                                Your Review
                            </label>

                            <textarea
                                name="ratingText"
                                placeholder="Write something amazing..."
                                onChange={(e) => settextarea(e.target.value)}
                                className="bg-zinc-100 rounded-2xl outline-none 
            border border-zinc-300 p-4 h-[140px] resize-none
            focus:border-black transition-all duration-200"
                            />

                        </div>


                        <div className="flex items-center justify-center gap-4 mt-3">

                            <button
                                type="button"
                                onClick={() => setshowraing(false)}
                                className="border border-zinc-300 px-6 py-3 rounded-2xl 
            font-semibold hover:bg-zinc-100 transition-all duration-200"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                onClick={handleonclick}
                                className="bg-black text-white font-bold px-8 py-3 rounded-2xl
            hover:scale-105 hover:bg-zinc-800 transition-all duration-200 shadow-lg"
                            >
                                Submit Review
                            </button>

                        </div>

                    </form>



                    {showreview.length > 0 && <div className="text-center mt-12">

                        <button
                            onClick={() => setshow(prev => !prev)}
                            className="bg-black text-white font-bold text-lg 
                            px-10 py-4 mb-10 rounded-full shadow-lg
                            hover:scale-105 hover:bg-zinc-800 transition-all duration-300"
                        >
                            {
                                show
                                    ? "Hide Reviews"
                                    : "Show Reviews"
                            }
                        </button>

                    </div>}

                </div>
            </div >
        </motion.div>
    )

}