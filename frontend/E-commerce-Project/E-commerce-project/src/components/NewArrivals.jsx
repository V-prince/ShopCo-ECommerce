import { Headings } from './Headings'
import { Cards } from './Cards'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CardSkeleton } from './Loadings/CardSkalation'
import { motion } from "framer-motion";

export const NewArrivals = () => {
    const items = useSelector((state) => state.Shopdata.Shopproduct)
    const Loadings = useSelector((state) => state.Shopdata.Loading)

    return (
        <motion.section
            id="new-arrival"
            className="max-w-[1400px] px-10 mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
        >
            
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <Headings content="NEW ARRIVALS" />
            </motion.div>

            {/* Products */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-4 mt-10">
                {Loadings ? (
                    [...Array(4)].map((_, index) => (
                        <CardSkeleton key={index} />
                    ))
                ) : (
                    items?.products?.slice(0, 4).map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                            }}
                            viewport={{ once: true }}
                            whileHover={{
                                y: -10,
                            }}
                        >
                            <Cards
                                item={item}
                                ratings={items?.ratings}
                            />
                        </motion.div>
                    ))
                )}
            </div>

            {/* Button */}
            <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
            >
                <Link to="/all-items">
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        className="bg-transparent font-semibold text-black md:px-20 px-30 py-3 border border-zinc-400 rounded-full mb-15 hover:bg-gradient-to-b to-zinc-700 from-zinc-900 hover:text-white cursor-pointer"
                    >
                        View All
                    </motion.button>
                </Link>
            </motion.div>

            
            <motion.hr
                className="text-zinc-300 mb-20"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
            />
        </motion.section>
    )
}