import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    loading:false,
    error : false
}


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loadingdata:(state)=>{
            state.loading = true
        },
        getData:(state, action)=>{
            state.user =action.payload
            state.loading = false
            state.error =false
        },
        getError:(state)=>{
            state.error = true
        },
        logout:(state)=>{
            state.user = null
            state.loading = false
            state.error = false
        }
    }
})


export const { loadingdata, getData, getError, logout  } = userSlice.actions
export default  userSlice.reducer