

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ShopItemsAction } from "../store/Shopitem";
import { AllDataComesFromServer } from '../services/api'


export default function Uploaddata() {
    const dispetch = useDispatch();
    useEffect(() => {

        let products = async () => {
            try {
                dispetch(ShopItemsAction.Loader(true))
                const data = await AllDataComesFromServer()
                if (!data.success) {
                    return
                }
                dispetch(ShopItemsAction.AddItems(data))
            } finally {
                dispetch(ShopItemsAction.Loader(false))
            }
        }
        products()

    }, [])
}
