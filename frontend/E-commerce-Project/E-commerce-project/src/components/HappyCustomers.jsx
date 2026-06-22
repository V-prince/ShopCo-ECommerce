
import { Headings } from './Headings'
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CReviews from './Items/CReviews'
import { MdVerified } from "react-icons/md";
import { BsStarFill, BsStarHalf } from "react-icons/bs";

export const HappyCustomers = () => {
    return (
        <div className='max-w-[1400px] mx-auto bg-white/50 backdrop-blur-lg px-10 mb-30'>
            <div className='mr-auto w-fit '>
                <Headings content="OUR HAPPY CUSTOMERS" />
            </div>
            <div className='flex justify-end gap-x-5  mb-5'>
                <button className='font-light text-center custom-prev text-2xl text-black bg-white p-4 rounded-xl'><FaArrowLeft /></button>
                <button className='font-light text-center custom-next text-2xl text-black bg-white p-4 rounded-xl'><FaArrowRight /></button>
            </div>
            <Swiper
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 20 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                }}
                loop={true}
                modules={[Pagination, Navigation]} className="mySwiper">
                {
                    CReviews.map(review => (
                        <SwiperSlide key={review.id} className='bg-white border-2 border-zinc-300 p-5 rounded-xl' >
                            <span className="flex gap-2 text-yellow-400">
                                {Array.from({ length: Math.floor(review.rating) }, (_, index) => (
                                    <BsStarFill key={index} />
                                ))}
                                {Array.from({ length: review.rating % 1 !== 0 }, (_, index) => (
                                    <BsStarHalf key={index} />
                                ))}
                            </span>
                            <div className='flex items-center gap-x-2 my-3'>
                                <h3 className='text-xl font-bold'>{review.name}</h3>
                                <span className="text-green-600">{<MdVerified />}</span>
                            </div>
                            <p className='text-zinc-600 mb-10'>{review.para}</p>
                        </SwiperSlide>
                    ))}
            </Swiper >

        </div >
    )
}
