import { PiInstagramLogoBold } from "react-icons/pi";
import { RiTwitterFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { Link } from "react-router-dom";
export const Footer = () => {
    return (
        <footer className=' bg-zinc-300 py-20'>
            <div className='max-w-[1400px] px-10 mx-auto'>
                <div className='flex items-center justify-between gap-4 flex-wrap'>
                    <div>
                        <h1 className='text-4xl font-extrabold'>SHOP.CO</h1>
                        <p className='text-zinc-500 md:w-[18vw] my-5'>We have clothes that suits your style and which you’re proud to wear. From women to men.
                        </p>
                        <div className='flex gap-3'>
                            <span className="text-2xl"><PiInstagramLogoBold/></span>
                            <span className="text-2xl"><RiTwitterFill/></span>
                            <span className="text-2xl"><FaFacebook/></span>
                            <span className="text-2xl"><FaGithub/></span>
                        </div>
                    </div>
                    <ul className='flex flex-col gap-4'>
                        <li><a href="#" className='text-zinc-800 text-xl font-semibold'>COMPANY</a></li>
                        <li><Link to="/about" className='text-zinc-500 hover:text-zinc-800'>About</Link></li>
                        <li><a href="#" className='text-zinc-500 hover:text-zinc-800'>Features</a></li>
                        <li><a href="#" className='text-zinc-500 hover:text-zinc-800'>Works</a></li>
                        <li><a href="#" className='text-zinc-500 hover:text-zinc-800'>Cureer</a></li>
                    </ul>
                    <ul className='flex flex-col gap-4'>
                        <li><a href="#" className='text-zinc-800 text-xl font-semibold'>HELP</a></li>
                        <li><Link to="/customer/support" className='text-zinc-500 hover:text-zinc-800'>Customer Support</Link></li>
                        <li><a href="#" className='text-zinc-500 hover:text-zinc-800'>Delivery Details</a></li>
                        <li><a href="#" className='text-zinc-500 hover:text-zinc-800'>Terms & Conditions</a></li>
                        <li><a href="#" className='text-zinc-500 hover:text-zinc-800'>Privacy Policy</a></li>
                    </ul>
                    <ul className='flex flex-col gap-4'>
                        <li><a href="#" className='text-zinc-800 text-xl  font-semibold'>FAQ</a></li>
                        <li><Link to="/profile" className='text-zinc-500 hover:hover:text-zinc-800'>Account</Link></li>
                        <li><a href="#" className='text-zinc-500 hover:hover:text-zinc-800'>Manage Deliveris</a></li>
                        <li><Link to="/user/myorders" className='text-zinc-500 hover:hover:text-zinc-800'>Orders</Link></li>
                        <li><a href="#" className='text-zinc-500 hover:hover:text-zinc-800'>Payments</a></li>
                    </ul>
                   
                </div>
            </div>
        </footer>
    )
}
