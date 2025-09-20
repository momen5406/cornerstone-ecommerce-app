"use client";
import React, { useContext, useState } from "react";
import { Button } from "./button";
import { CartContext } from "@/context/CartContext";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const QuantitySelector = ({
  numberOfItems,
  priceOfOne,
  productId,
}: {
  numberOfItems: number;
  priceOfOne: number;
  productId: string;
}) => {
  const { setCartData } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const priceOfAll = numberOfItems * priceOfOne;

  const session = useSession();
  const changeQuantity = async (count: number) => {
    setIsLoading(true);

    const response = await fetch(`/api/cart/${productId}`, {
      method: "PUT",
      headers: {
        token: session.data?.token + "",
      },
      body: JSON.stringify({ count }),
    });
    const data = await response.json();
    setCartData(data);
    setIsLoading(false);
    toast.success("Cart updated successfully.");
  };

  return (
    <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between gap-y-2">
      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <Button
          className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer"
          variant="outline"
          onClick={() => {
            changeQuantity(numberOfItems - 1);
          }}
          disabled={numberOfItems === 1}
        >
          -
        </Button>
        <span className="px-3 py-1 border rounded-md text-base font-semibold">
          {isLoading ? (
            <Loader2 className="text-accent transition duration-300 animate-spin" />
          ) : (
            numberOfItems
          )}
        </span>
        <Button
          className="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer"
          variant="outline"
          onClick={() => {
            changeQuantity(numberOfItems + 1);
          }}
        >
          +
        </Button>
      </div>

      {/* Subtotal */}
      <div className="bg-gray-50 px-3 py-2 rounded-md w-fit">
        <h4 className="text-sm font-medium text-gray-600">Subtotal</h4>
        <span className="text-lg font-bold text-accent">{priceOfAll} EGP</span>
      </div>
    </div>
  );
};

export default QuantitySelector;
