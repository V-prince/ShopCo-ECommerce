import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Outlet } from 'react-router-dom'
import Uploaddata from './uploadimage'
import { useEffect } from 'react'
import { ShopItemsAction } from '../store/Shopitem'
import { useDispatch } from 'react-redux'
export const Layouts = () => {
    return (
        <>
            <Navbar />
            <Uploaddata />
            <Outlet />
            <Footer />
        </>
    )
}
