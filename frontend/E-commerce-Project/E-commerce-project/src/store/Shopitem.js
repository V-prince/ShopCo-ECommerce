import { createSlice } from "@reduxjs/toolkit";
let ShopItemsSlice = createSlice({
    name: 'Shopdata',
    initialState: {
        Shopproduct: [],
        Loading: false,
        user: null
    },

    reducers: {
        AddItems: (state, action) => {
            state.Shopproduct = action.payload;
        },
        Loader: (state,action) => {
            state.Loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.user = null;
        }
    }
})

export let ShopItemsAction = ShopItemsSlice.actions;
export default ShopItemsSlice.reducer;