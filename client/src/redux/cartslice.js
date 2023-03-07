import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wish:null,
    cart:null,
    loading:false,
    error : false
}


const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        loadingcartdata:(state)=>{
            state.loading = true
        },
        getCart:(state, action)=>{
            
            state.cart =action.payload
            state.loading = false
            state.error =false
        },
        getWish:(state, action)=>{
            
            state.wish = action.payload
            state.loading = false
            state.error =false
        },
        getErrorincart:(state)=>{
            state.error = true
        },
        clearAll:(state)=>{
            state.cart =null
            state.wish=null
            state.loading = false
            state.error =false
        }
        
    }
})


export const { loadingcartdata, getCart, getErrorincart, clearAll, getWish} = cartSlice.actions
export default  cartSlice.reducer