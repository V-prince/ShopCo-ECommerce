import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCartOutline, IoClose } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { SearchAction } from "../store/Search";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

import { useEffect } from "react";
import { ShopItemsAction } from "../store/Shopitem";
import { SearchProducts } from "../services/api";

export const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestion, setSuggetion] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.Shopitem.selecteditem);
    const user = useSelector((state) => state.Shopdata.user);

    const handleSearchChange = async (e) => {
        const value = e.target.value
        setQuery(value)
    };

    useEffect(() => {
        const timer = setTimeout(async () => {

            if (!query.trim()) {
                setSuggetion([])
                return;
            }
            const data = await SearchProducts(query)
            setSuggetion(data.products)
        }, 300);

        const user = JSON.parse(localStorage.getItem("user"))
        dispatch(ShopItemsAction.setUser(user))

        return () => clearTimeout(timer);
    }, [query])

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur shadow-2xl
      md:h-[12vh] h-[9vh] flex items-center"
        >
            <nav className="max-w-[1400px] mx-auto w-full flex items-center justify-between px-5">

                {/* LEFT */}
                <div className="flex items-center gap-3">
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setMenu(!menu)}
                    >
                        {menu ? <HiOutlineBars3BottomLeft /> : <RxHamburgerMenu />}
                    </button>

                    <Link to="/">
                        <h1 className="text-2xl md:text-3xl font-integral font-extrabold 
                        transition-all duration-300 hover:tracking-wider hover:text-zinc-700">
                            SHOP.CO
                        </h1>
                    </Link>
                </div>

                {/* CENTER MENU */}
                <ul className="hidden md:flex items-center gap-8 font-medium text-sm">

                    <Link to="/all-items" className="relative cursor-pointer text-sm font-medium
after:content-[''] after:absolute after:left-0 after:-bottom-1
after:h-[2px] after:w-0 after:bg-black
after:transition-all after:duration-300
hover:after:w-full hover:text-black">Shop</Link>
                    <li className="relative cursor-pointer text-sm font-medium
after:content-[''] after:absolute after:left-0 after:-bottom-1
after:h-[2px] after:w-0 after:bg-black
after:transition-all after:duration-300
hover:after:w-full hover:text-black">On Sale</li>
                    <ScrollLink to="new-arrival" smooth={true}
                        duration={500} onClick={() => navigate("/#new-arrival")} className="relative cursor-pointer text-sm font-medium
after:content-[''] after:absolute after:left-0 after:-bottom-1
after:h-[2px] after:w-0 after:bg-black
after:transition-all after:duration-300
hover:after:w-full hover:text-black">New Arrivals</ScrollLink>
                    <li className="relative cursor-pointer text-sm font-medium
after:content-[''] after:absolute after:left-0 after:-bottom-1
after:h-[2px] after:w-0 after:bg-black
after:transition-all after:duration-300
hover:after:w-full hover:text-black">Brands</li>

                    {user?.role === "host" && (
                        <Link to="/host">
                            <li className="relative cursor-pointer text-sm font-medium
after:content-[''] after:absolute after:left-0 after:-bottom-1
after:h-[2px] after:w-0 after:bg-black
after:transition-all after:duration-300
hover:after:w-full hover:text-black text-blue-600">Host</li>
                        </Link>
                    )}

                    <Link to="/user/myorders">
                        <li className="relative cursor-pointer text-sm font-medium
after:content-[''] after:absolute after:left-0 after:-bottom-1
after:h-[2px] after:w-0 after:bg-black
after:transition-all after:duration-300
hover:after:w-full hover:text-black">My Orders</li>
                    </Link>
                </ul>

                {/* RIGHT */}
                <div className="flex items-center gap-5">

                    {/* SEARCH (desktop) */}
                    <div className="hidden md:flex relative items-center bg-zinc-100 px-4 py-2 rounded-full w-[320px]">
                        <Link to="/carts" className="relative text-2xl transition-all duration-300 hover:scale-110 hover:text-black">
                            <IoIosSearch />
                        </Link>
                        <input
                            className="bg-transparent w-full outline-none px-2 text-sm"
                            placeholder="Search..."
                            value={query}
                            onChange={handleSearchChange}
                        />

                        {suggestion?.length > 0 && (
                            <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-xl max-h-80 overflow-y-auto z-50">

                                {suggestion.slice(0, 5).map((item) => (
                                    <Link
                                        key={item._id}
                                        to={`/shop-items/${item._id}`}
                                        className="flex items-center gap-3 p-3 hover:bg-gray-100"
                                        onClick={
                                            () => {
                                                setQuery("");
                                                setSuggetion([]);
                                            }
                                        }
                                    >
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-12 h-12 object-cover rounded"
                                        />

                                        <div>
                                            <h3 className="font-medium text-sm">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-500 text-xs">
                                                ₹{item.price}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                    </div>


                    {/* MOBILE SEARCH */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setSearchOpen(!searchOpen)}
                    >
                        <IoIosSearch />
                    </button>

                    {/* CART */}
                    <Link to="/carts" className="relative text-2xl transition-all duration-300 hover:scale-110 hover:text-black">
                        <IoCartOutline />
                        {cartItems?.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>

                    {/* PROFILE */}
                    <Link to="/profile" className="text-2xl transition-all duration-300 hover:scale-110 hover:text-black">
                        <CgProfile />
                    </Link>
                </div>
            </nav>

            {/* MOBILE SEARCH BAR */}
            {searchOpen && (
                <div className="md:hidden px-4 pb-2">
                    <div className="flex items-center bg-zinc-100 px-3 py-2 rounded-xl">
                        <IoIosSearch className="text-xl" />
                        <input
                            className="bg-transparent w-full outline-none px-2"
                            placeholder="Search..."
                            value={query}
                            onChange={handleSearchChange}
                        />
                        {suggestion?.length > 0 && (
                            <div className="absolute top-14 left-0 w-full bg-white shadow-lg rounded-xl max-h-80 overflow-y-auto z-50">

                                {suggestion.slice(0, 5).map((item) => (
                                    <Link
                                        key={item._id}
                                        to={`/shop-items/${item._id}`}
                                        className="flex items-center gap-3 p-3 hover:bg-gray-100"
                                        onClick={
                                            () => {
                                                setQuery("");
                                                setSuggetion([]);
                                            }
                                        }
                                    >
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-12 h-12 object-cover rounded"
                                        />

                                        <div>
                                            <h3 className="font-medium text-sm">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-500 text-xs">
                                                ₹{item.price}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                        <button onClick={() => setSearchOpen(false)}>
                            <IoClose />
                        </button>
                    </div>
                </div>
            )}

            {/* MOBILE MENU */}
            {menu && (
                <div className="md:hidden absolute top-[9vh] left-0 w-full bg-white shadow-lg p-5 space-y-4">
                    <Link to={"/all-items"} onClick={() => setMenu(prev => !prev)}><p>Shop</p></Link>
                    <p>On Sale</p>
                    <p>New Arrivals</p>
                    <p>Brands</p>

                    {user?.role === "host" && <p className="text-blue-600"><Link to={"/host"} onClick={() => setMenu(prev => !prev)}><p>Host</p></Link></p>}
                    <Link to={"/user/myorders"} onClick={() => setMenu(prev => !prev)}><p>My Order</p></Link>
                </div>
            )}
        </header>
    );
};