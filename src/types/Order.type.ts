import { Product } from "./product.type";

export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  _id: string;
  id: number;
  user: User;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "card" | "cash" | string;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
