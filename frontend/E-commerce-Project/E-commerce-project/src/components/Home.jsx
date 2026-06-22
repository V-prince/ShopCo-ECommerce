import { Hero } from './Hero'
import { Blackbar } from './Blackbar'
import { Headings } from './Headings'
import { NewArrivals } from './NewArrivals'
import { TopSelling } from './TopSelling'
import { DressStyle } from './DressStyle'
import { HappyCustomers } from './HappyCustomers'
import Uploaddata from './uploadimage'
import { Loading } from './Loading'
import { useDispatch, useSelector } from 'react-redux'
import { ShopItemsAction } from '../store/Shopitem'
import { useEffect } from 'react'
import { CardSkeleton } from './Loadings/CardSkalation'
import AIChatBot from './AIChatBot/AiChatbot'


export const Home = () => {
    const Loadings = useSelector((state) => state.Shopdata.Loading)

    const dispatch = useDispatch()

    useEffect(() => {

        const user = JSON.parse(
            localStorage.getItem("user")
        )

        if (user) {
            dispatch(
                ShopItemsAction.setUser(user)
            )
        }

    }, [])


    return (
        <>
            <Hero />
            <Blackbar />
            <Headings />
            <NewArrivals />
            <TopSelling />
            <DressStyle />
            <HappyCustomers />
            <AIChatBot/>
            <Uploaddata />
        </>
    )
}
