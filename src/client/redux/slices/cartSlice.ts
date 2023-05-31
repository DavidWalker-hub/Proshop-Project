import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Item } from "../../../types/cart";

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const initialState = localStorage.getItem("cart")
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

      //   calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce(
          (acc: number, item: Item) => acc + item.price * item.qty,
          0
        )
      );
      // calculate shipping price if order over £100 free, else £10
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      // calculate tax price (15%)
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );
      // calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
