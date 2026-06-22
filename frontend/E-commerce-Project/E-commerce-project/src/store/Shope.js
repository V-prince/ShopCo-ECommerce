import { createSlice } from "@reduxjs/toolkit";

let ShopSlice = createSlice({
    name: 'Shopitem',
    initialState: {
        selecteditem: localStorage.getItem('selecteditem') ? JSON.parse(localStorage.getItem('selecteditem')) : [],
    },
    reducers: {
        ShopItems: (state, action) => {
            
            if (!action.payload.id || !action.payload.scolor || !action.payload.ssize) {
                return; 
            }
            
            const existingIndex = state.selecteditem.find(
                item => item.id === action.payload.id &&
                    item.ssize === action.payload.ssize &&
                    item.scolor === action.payload.scolor
            );

            if (existingIndex) {
                existingIndex.counter += action.payload.counter || 1;
            } else {
                state.selecteditem.push({
                    ...action.payload,
                });
            }
        },
        removeitem: (state, action) => {
                state.selecteditem = state.selecteditem.filter(item => item.id !== action.payload.id)
        },
        updatecounter:(state,action)=>{
            let {id,counter} = action.payload;
            let item = state.selecteditem.find(item => item.id === id);
            if (item) {
                item.counter = counter;
            }
            }
    }
})

export let ShopAction = ShopSlice.actions;
export default ShopSlice;