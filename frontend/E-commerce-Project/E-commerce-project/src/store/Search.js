import { createSlice } from "@reduxjs/toolkit";

let SearchSlice = createSlice({
    name: 'Searching',
    initialState:'',
    reducers:{
        SearchItems:(state,action)=>{
            return action.payload;
        }
    }
})

export let SearchAction = SearchSlice.actions;   
export default SearchSlice;