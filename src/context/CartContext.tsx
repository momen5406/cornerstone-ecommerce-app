"use client";
import { Cart } from "@/types/Cart.type";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
  cartData: Cart | null;
  setCartData: (value: Cart | null) => void;
  isLoading: boolean;
  getUserCart: () => void;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  getUserCart() {},
});

const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartData, setCartData] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const session = useSession();

  const getUserCart = async () => {
    if (!session.data) return;
    const response = await fetch("/api/getCart");
    const data: Cart = await response.json();

    setCartData(data);
    if (cartData?.data.cartOwner) {
      localStorage.setItem("userId", cartData?.data.cartOwner);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      getUserCart();
    }
  }, [session.status]);

  return (
    <CartContext.Provider
      value={{ cartData, setCartData, isLoading, getUserCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
