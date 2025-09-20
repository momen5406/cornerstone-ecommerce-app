"use client";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/ProductCard";
import { WishlistContext } from "@/context/WishlistContext";
import { Heart } from "lucide-react";
import Link from "next/link";
import React, { useContext } from "react";

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);


  return (
    <div className="container my-17">
      <div className="mb-5">
        <h5 className="text-xl font-semibold">
          My Wishlist{" "}
          <span className="text-gray-500 text-base">
            ({wishlist.length} items)
          </span>
        </h5>
        <p className="text-gray-500 text-sm mt-1">
          Save your favorite products for later.
        </p>
      </div>

      {wishlist.length == 0 ? (
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
          <div className="bg-accent/10 text-accent p-4 rounded-full mb-4">
            <Heart size={32} />
          </div>
          <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm">
            Start exploring products and add them to your wishlist.
          </p>
          <Button>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-5 gap-2">
          {wishlist.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
