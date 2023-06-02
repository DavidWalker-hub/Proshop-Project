import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { Cart, Item } from "../../../types/cart";
import { updateCart } from "../../utils/cartUtils";

const initialState: Cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") as string)
  : { cartItems: [] as Item[] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      const newItem = action.payload;

      const existItem = state.cartItems.find(
        (item: Item) => item._id === newItem._id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((item: Item) =>
          item._id === existItem._id ? newItem : item
        );
      } else {
        state.cartItems = [...state.cartItems, newItem];
      }

      updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<Item["_id"]>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
