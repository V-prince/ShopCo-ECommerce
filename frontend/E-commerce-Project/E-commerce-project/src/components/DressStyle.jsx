
import { Headings } from './Headings'

export const DressStyle = () => {
  return (
    <section className='max-w-[1400px] px-10 mx-auto'>
      <div className='bg-zinc-300  rounded-3xl md:py-10 py-5'>
        <Headings content="BROWSE BY DRESS STYLE" />
        <div className='flex gap-3 mx-auto items-center justify-center px-3 w-[80vw] mt-20 flex-wrap'>
          <div className='bg-[url(/images/style-2.png)]  bg-top-left h-[200px] w-[350px] md:h-70 md:w-120 rounded-2xl p-5 md:p-10'><span className='font-semibold text-3xl '> Casual</span></div>
          <div className='bg-[url(/images/style-1.png)] bg-cover bg-top  h-[200px] w-[350px] md:h-70 md:w-160 rounded-2xl p-5 md:p-10'><span className='font-semibold text-3xl '> Formal</span></div>
          <div className='bg-[url(/images/style-3.png)] bg-cover bg-top h-[200px] w-[350px] md:h-70 md:w-160 rounded-2xl p-5 md:p-10'><span className='font-semibold text-3xl '> Party</span></div>
          <div className='bg-[url(/images/style-4.png)] bg-cover bg-left h-[200px] w-[350px] md:h-70 md:w-120 bg-bottom-right rounded-2xl p-5 md:p-10'><span className='font-semibold text-3xl '> Gym</span></div>
        </div>
      </div>
    </section>
  )
}
