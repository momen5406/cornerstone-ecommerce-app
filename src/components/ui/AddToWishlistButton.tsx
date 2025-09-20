"use client";
import React, { useContext } from "react";
import { Button } from "./button";
import { Heart, Loader2 } from "lucide-react";
import { WishlistContext } from "@/context/WishlistContext";

const AddToWishlistButton = ({ productId }: { productId: string }) => {
  const { addToWishlist, deleteFromWishlist, wishlistIdProducts, isLoadingId } =
    useContext(WishlistContext);

  return (
    <Button
      variant="outline"
      className={`flex items-center gap-2 cursor-pointer hover:bg-red-500 ${
        wishlistIdProducts.includes(productId)
          ? "bg-red-500 text-white"
          : "bg-transparent"
      }`}
      onClick={() => {
        if (wishlistIdProducts.includes(productId)) {
          deleteFromWishlist(productId);
        } else {
          addToWishlist(productId);
        }
      }}
    >
      {isLoadingId == productId ? (
        <Loader2 className="transition duration-300 animate-spin" />
      ) : (
        <>
          <Heart size={18} /> Add to Wishlist
        </>
      )}
    </Button>
  );
};

export default AddToWishlistButton;
