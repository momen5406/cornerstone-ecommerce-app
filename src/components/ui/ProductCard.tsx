"use client";
import React, { useContext } from "react";
import { Product } from "@/types/product.type";
import Image from "next/image";
import CategoryBadge from "./CategoryBadge";
import ProductTitle from "./ProductTitle";
import BrandName from "./BrandName";
import ProductPrice from "./ProductPrice";
import Ratings from "../features/Ratings";
import { FaHeart } from "react-icons/fa6";
import AddToCartButton from "./AddToCartButton";
import { WishlistContext } from "@/context/WishlistContext";
import { Loader2 } from "lucide-react";
import Loading from "@/app/loading";

const ProductCard = ({ product }: { product: Product }) => {
  const { wishlistIdProducts, addToWishlist, deleteFromWishlist, isLoadingId } =
    useContext(WishlistContext);

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="border rounded-lg p-4 flex flex-col relative hover:shadow-md transition">
      {/* Wishlist */}
      {isLoadingId === product._id ? (
        <Loader2 className="absolute top-3 right-3 transition duration-300 animate-spin" />
      ) : (
        <button
          className="absolute top-3 right-3 transition duration-300"
          onClick={() => {
            if (wishlistIdProducts.includes(product._id)) {
              deleteFromWishlist(product._id);
            } else {
              addToWishlist(product._id);
            }
          }}
        >
          <FaHeart
            className={` hover:text-red-500 hover:scale-110  cursor-pointer ${
              wishlistIdProducts.includes(product._id)
                ? "text-red-500"
                : "text-neutral-500"
            }`}
            size={24}
          />
        </button>
      )}

      {/* Product Image */}
      <Image
        src={product.imageCover}
        alt={product.title}
        width={500}
        height={500}
        priority
        className="w-full aspect-square object-cover rounded-md mb-3"
      />

      {/* Category */}
      <CategoryBadge displayedText={product.category.name} />

      {/* Title */}
      <ProductTitle
        displayedText={product.title}
        link={`/productDetails/${product._id}`}
      />

      {/* Rating */}
      <Ratings rating={product.ratingsAverage} className="-mt-1 mb-1" />

      {/* Brand */}
      <BrandName displayedText={product.brand.name} />

      {/* Price + Button */}
      <div className="mt-auto">
        <ProductPrice displayedText={`${product.price} EGP`} />
        <AddToCartButton id={product._id} />
      </div>
    </div>
  );
};

export default ProductCard;
