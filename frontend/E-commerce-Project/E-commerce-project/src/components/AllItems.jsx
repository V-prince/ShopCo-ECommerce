import React from "react";
import { useSelector } from "react-redux";
import { Cards } from "./Cards";
import { FaFilter } from "react-icons/fa";
import CountUp from "react-countup";
import { motion } from "framer-motion";

export const AllItems = () => {
  const items = useSelector(
    (state) => state.Shopdata.Shopproduct
  );

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 pt-40 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[1400px] mx-auto px-5">

        {/* HERO SECTION */}
        <motion.div
          className="relative overflow-hidden bg-black rounded-[40px] p-10 md:p-16 mb-12"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />

          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">

            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white">
                ✨ New Collection 2026
              </span>

              <h1 className="text-5xl md:text-7xl font-black leading-none mt-6 text-white">
                Discover
                <br />
                Premium Fashion
              </h1>

              <p className="mt-6 text-zinc-400 max-w-xl text-lg">
                Shop trending outfits, premium quality fabrics,
                and exclusive collections crafted for modern style.
              </p>
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                {
                  value: `${items?.products?.length || 0}+`,
                  label: "Products",
                },
                {
                  value: <CountUp start={0} end={50} duration={1.5} />,
                  suffix: "K+",
                  label: "Customers",
                },
                {
                  value: "4.9★",
                  label: "Rating",
                },
                {
                  value: "24/7",
                  label: "Support",
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl"
                >
                  <h3 className="text-4xl font-black text-white">
                    {card.value}
                    {card.suffix}
                  </h3>

                  <p className="text-zinc-400 mt-2">
                    {card.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* SEARCH/FILTER SECTION */}
        <motion.div
          className="bg-white rounded-3xl shadow-lg p-5 flex flex-col md:flex-row gap-5 justify-between items-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-4xl font-black">
              All Products
            </h2>

            <p className="text-zinc-500 mt-1">
              {items?.products?.length || 0} Products Available
            </p>
          </div>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="bg-white/80 backdrop-blur-md border border-zinc-200 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <FaFilter />
            Filter
          </motion.button>
        </motion.div>

        {/* PRODUCTS */}
        {!items?.products?.length ? (
          <div className="bg-white rounded-3xl p-20 text-center shadow-lg">
            <h2 className="text-4xl font-bold">
              No Products Found
            </h2>

            <p className="text-zinc-500 mt-3">
              Products will appear here once available.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items?.products?.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                }}
              >
                <Cards item={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};