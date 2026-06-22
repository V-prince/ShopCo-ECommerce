import { motion } from "framer-motion";

export const Blackbar = () => {
  const brands = [
    "/images/Group.png",
    "/images/zara-logo-1 1.png",
    "/images/gucci-logo-1 1.png",
    "/images/prada-logo-1 1.png",
    "/images/Ck.png",
  ];

  return (
    <div className="w-full flex items-center justify-around py-5 flex-wrap gap-3 bg-black">
      {brands.map((brand, index) => (
        <motion.img
          key={index}
          src={brand}
          alt="brand"
          className="md:max-w-[200px] w-[100px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.2,
          }}
          viewport={{ once: true }}
        />
      ))}
    </div>
  );
};