import { PropagateLoader } from "react-spinners";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="text-center">

        <h1 className="text-5xl font-black tracking-widest text-black mb-3">
          SHOP.CO
        </h1>

        <p className="text-gray-500 mb-8">
          Loading your shopping experience...
        </p>

        <PropagateLoader
          color="#000000"
          size={15}
          speedMultiplier={1.5}
        />
      </div>
    </div>
  );
};