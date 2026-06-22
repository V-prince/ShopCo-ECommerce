import { configureStore } from "@reduxjs/toolkit";
import SearchSlice from "./Search";
import ShopSlice from "./Shope";
import ShopItemsSlice from "./Shopitem";


let ShopStore = configureStore({
    reducer: {
        Searching: SearchSlice.reducer,
        Shopitem: ShopSlice.reducer,
        Shopdata: ShopItemsSlice,
    }
})

export default ShopStore;