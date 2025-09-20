"use client";
import React, { useContext, useState } from "react";
import { Button } from "./button";
import { LoaderCircleIcon, ShoppingCartIcon } from "lucide-react";
import { CartContext } from "@/context/CartContext";
import toast from "react-hot-toast";

const AddToCartButton = ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) => {
  const { setCartData } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/api/addToCart", {
      method: "POST",
      body: JSON.stringify({ productId: id }),
    });

    const data = await response.json();

    setCartData(data);
    toast("Item added to your cart.", {
      icon: "🛒",
    });
    setIsLoading(false);
  };

  return (
    <Button
      onClick={addToCart}
      className={`w-full flex items-center cursor-pointer ${className}`}
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
