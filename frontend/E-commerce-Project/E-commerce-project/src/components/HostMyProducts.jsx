import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FetchAllMyProducts, HostDeleteDataFromServer } from '../services/api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { CardSkeleton } from './Loadings/CardSkalation'

export const MyProducts = () => {
  const [myProducts, setmyProducts] = useState([])
  const [filter, setfilter] = useState("all")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const user = useSelector(
    (state) => state.Shopdata.user
  )



  const handleDelete = async (id) => {
    const data = await HostDeleteDataFromServer(id)
    setmyProducts(prev => prev.filter((item) => item._id !== id))
    toast.success(data.message)
  }

  const fetchAllMyproducts = async () => {
    try {
      const data = await FetchAllMyProducts(filter);
      setLoading(true)
      setmyProducts(data)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllMyproducts()
  }, [filter])

  return (

    <section className='max-w-[1400px] mx-auto px-5 py-30'>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-zinc-600 hover:text-black"
      >
        <FaArrowLeft />
        Back
      </button>
      <div className='flex items-center justify-between mb-10'>
        <div>
          <h1 className='text-4xl font-extrabold'>
            My Products
          </h1>

          <p className='text-zinc-500 mt-2'>
            Welcome {user?.name}
          </p>
        </div>

        <div className=' gap-4'>

          <select
            className='border border-zinc-300 px-5 py-3 rounded-2xl outline-none cursor-pointer' onChange={(e) => setfilter(e.target.value)}
          >

            <option value="all">
              All Products
            </option>

            <option value="low">
              Low Price
            </option>

            <option value="high">
              High Price
            </option>

            <option value="latest">
              Latest
            </option>

            <option value="discount">
              Discount
            </option>

          </select>

        </div>


      </div>

      {

        myProducts.length === 0 ?

          <div className='flex items-center justify-center h-[50vh]'>

            <h1 className='text-3xl font-bold text-zinc-400'>
              No Products Found
            </h1>

          </div>

          :

          <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8'>

            {
              loading ? [...Array(Number(myProducts.length > 0 ? myProducts.length : 8))].map((_, index) => (
                <CardSkeleton key={index} />
              )) :
                myProducts.map((item) => (

                  <div
                    key={item._id}
                    className='bg-white rounded-3xl overflow-hidden shadow-lg border border-zinc-200'
                  >

                    <img
                      src={item.image}
                      alt=""
                      className='w-full h-[300px] object-cover'
                    />

                    <div className='p-5'>

                      <h1 className='text-xl font-bold line-clamp-1'>
                        {item.title}
                      </h1>

                      <p className='text-zinc-500 text-sm mt-2 line-clamp-2'>
                        {item.description}
                      </p>

                      <div className='flex items-center justify-between mt-5'>

                        <div>

                          <h2 className='text-2xl font-extrabold'>
                            ₹{item.price}
                          </h2>

                          <p className='text-green-600 font-semibold'>
                            {item.discount}% OFF
                          </p>

                        </div>

                        <div className='flex gap-2'>

                          <Link to={`/host/edit/${item._id}`} className='bg-black text-white px-4 py-2 rounded-full text-sm'>
                            Edit
                          </Link>

                          <button className='bg-red-500 text-white px-4 cursor-pointer py-2 rounded-full text-sm' onClick={() => handleDelete(item._id)}>
                            Delete
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                ))
            }

          </div>

      }

    </section>

  )

}