"use client";

import React, { useContext, useState } from "react";
import { Button } from "./button";
import { LoaderCircleIcon, ShoppingCartIcon } from "lucide-react";
import { CartContext } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AddToCartButton = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const { setCartData } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const addToCart = async () => {
    if (!session) {
      // Not logged in → route to login
      router.push("/login");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/addToCart", {
        method: "POST",
        headers: {
          token: session.token,
        },
        body: JSON.stringify({ productId: id }),
      });

      if (!response.ok) {
        toast.error("Failed to add item.");
        return;
      }

      const data = await response.json();
      setCartData(data);

      toast("Item added to your cart.", {
        icon: "🛒",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={addToCart}
      className={`w-full flex items-center cursor-pointer ${className}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <>
          <ShoppingCartIcon /> Add to Cart
        </>
      )}
    </Button>
  );
};

export default AddToCartButton;
