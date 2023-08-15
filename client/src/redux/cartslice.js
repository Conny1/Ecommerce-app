import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wish: null,
  cart: null,
  totalPrice: 0,
  loading: false,
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    loadingcartdata: (state) => {
      state.loading = true;
    },
    getCart: (state, action) => {
      state.cart = action.payload;
      state.loading = false;
      state.error = false;
    },
    getWish: (state, action) => {
      state.wish = action.payload;
      state.loading = false;
      state.error = false;
    },
    getErrorincart: (state) => {
      state.error = true;
    },
    clearAll: (state) => {
      state.cart = null;
      state.wish = null;
      state.loading = false;
      state.error = false;
    },

    UpdateTotalPrice: (state, action) => {
      if (action.payload.act === "default") {
        state.totalPrice = action.payload.price;
      }
      if (action.payload?.act === "inc") {
        state.totalPrice += action.payload?.price;
      }
      if (action.payload?.act === "dec") {
        state.totalPrice -= action.payload?.price;
      }
    },
  },
});

export const {
  loadingcartdata,
  getCart,
  getErrorincart,
  clearAll,
  getWish,
  UpdateTotalPrice,
} = cartSlice.actions;
export default cartSlice.reducer;
