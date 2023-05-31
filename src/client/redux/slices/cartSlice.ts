import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Item } from "../../../types/cart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : { cartItems: [] as Item[] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      const item = action.payload;

      const existItem = state.cartItems.find((i: Item) => i._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((i: Item) =>
          i._id === existItem._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
  },
});

export default cartSlice.reducer;
