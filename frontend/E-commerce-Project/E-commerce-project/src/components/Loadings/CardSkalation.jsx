export const CardSkeleton = () => {
  return (

      <div className=" flex flex-col md:max-w-[300px] overflow-hidden my-10 animate-pulse">

        <div className="w-full h-[300px] rounded-3xl bg-zinc-200"></div>

        
        <div className="h-7 w-3/4 bg-zinc-200 rounded mt-3"></div>

       
        <div className="flex gap-2 mt-2 items-center">
          <div className="h-4 w-20 bg-zinc-200 rounded"></div>
          <div className="h-4 w-10 bg-zinc-200 rounded"></div>
        </div>

        
        <div className="flex gap-3 mt-3 items-center">
          <div className="h-6 w-16 bg-zinc-200 rounded"></div>
          <div className="h-6 w-14 bg-zinc-200 rounded"></div>
          <div className="h-5 w-10 bg-zinc-200 rounded-full"></div>
        </div>

      </div>

  );
};