export interface Item {
  _id?: string;
  name: string;
  qty: number;
  image: string;
  price: number;
  countInStock: number;
}

export interface Cart {
  cartItems: Item[];
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}
