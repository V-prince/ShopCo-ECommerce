import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <section className=' bg-zinc-200 md:mt-21 mt-16'>
            <div className='max-w-[1400px] mx-auto px-10 flex md:flex-row flex-col items-center'>
                <div className='md:flex-1 py-15'>
                    <motion.h1
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='md:text-6xl text-4xl  font-extrabold text-black'>FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE</motion.h1>
                    <motion.p

                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}

                        className='t text-zinc-400 mt-4 mb-5  max-w-[400px] md:my-5'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</motion.p>
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='bg-black text-white md:px-12 md:py-3 py-3 md:w-[12vw] w-full rounded-full mb-15'
                    >
                        Shop Now
                    </motion.button>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }} className='flex items-center justify-center flex-wrap gap-y-4'>
                        <div className='md:pr-8 pr-2'>
                            <h3 className='md:text-3xl text-3xl font-semibold'>200+</h3>
                            <p className='text-zinc-400'>international Brands</p>
                        </div>
                        <div className='border-l md:h-16 h-15 border-zinc-300'></div>
                        <div className='md:px-8 px-2'>
                            <h3 className='md:text-3xl text-3xl font-semibold'>2000+</h3>
                            <p className='text-zinc-400'>High-Quality Products</p>
                        </div>
                        <div className='border-l md:h-16 border-zinc-300 '></div>
                        <div className='md:px-8 '>
                            <h3 className='md:text-3xl text-3xl font-semibold'>30,000+</h3>
                            <p className='text-zinc-400 '>Happy Customes</p>
                        </div>
                    </motion.div>
                </div>
                <div className="flex-1">
                    <motion.img
                        src="/images/Rectangle 2.png"
                        alt="Hero img"
                        loading="lazy"
                        className="w-full h-full object-cover md:pl-20"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    />
                </div>
            </div>
        </section >
    )
}
