import { useSelector } from 'react-redux'
import { Cards } from './Cards'


export const SearchItems = () => {
    let items = useSelector((state) => state.Shopdata.Shopproduct)
    let searchItem = useSelector((state) => state.Searching)
    let filterditems = items.filter(item =>
        item.title.toLowerCase().includes(searchItem))

    return (
        <div className='max-w-[1400px] px-10 mx-auto mt-45'>
            {
                filterditems.length > 0 ? (
                <div className='grid grid-cols-1 gap-5  md:grid-cols-4  mt-10'>
                    {
                        filterditems.map(item => (
                            <Cards item={item} key={item.id} />
                        ))
                    }
                </div>) 
                :
                <p className='text-center font-extrabold text-3xl my-auto'>No items found</p>
            }
        </div>

    )
}
