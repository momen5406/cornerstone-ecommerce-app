"use client";
import { Cart } from "@/types/Cart.type";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  const router = useRouter();

  const getUserCart = async () => {
    if (!session.data) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/getCart", {
        headers: {
          token: session.data.token,
        },
      });
      const data = await response.json();

      if (
        data.statusMsg === "fail" &&
        data.message === "Invalid Token. please login again"
      ) {
        setCartData(null);
        toast.error("Invalid token. Please login again.");
        router.push("/login");
        return;
      }

      setCartData(data);

      // save cart owner to localStorage if exists
      if (data?.data?.cartOwner) {
        localStorage.setItem("userId", data.data.cartOwner);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Something went wrong while loading your cart.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
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
