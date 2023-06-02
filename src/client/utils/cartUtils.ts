import { Item, Cart } from "../../types/cart";

export const addDecimals = (num: number) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state: Cart) => {
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
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
  // calculate total price
  state.totalPrice = Number(
    (
      Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
    ).toFixed(2)
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
