import getSpecificProducts from "@/apis/getSpecificProduct";
import getSpecificProductsCategory from "@/apis/getSpecificProductsCategory";
import ProductSlider from "@/components/features/ProductSlider";
import Ratings from "@/components/features/Ratings";
import AddToCartButton from "@/components/ui/AddToCartButton";
import AddToWishlistButton from "@/components/ui/AddToWishlistButton";
import BrandName from "@/components/ui/BrandName";
import CategoryBadge from "@/components/ui/CategoryBadge";
import ProductCard from "@/components/ui/ProductCard";
import ProductPrice from "@/components/ui/ProductPrice";
import ProductTitle from "@/components/ui/ProductTitle";
import { Product } from "@/types/product.type";
import React from "react";

const ProductDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const product = await getSpecificProducts(id);
  const categoryID = product.category._id;

  const categoryProducts: Product[] = await getSpecificProductsCategory(
    categoryID
  );
  const numberOfProducts = Array.from({ length: 5 });

  return (
    <div className="container my-16">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="md:col-span-1 overflow-hidden">
          <ProductSlider images={product.images} />
        </div>
        <div className="md:col-span-2">
          {/* Header */}
          {/* Category */}

          <CategoryBadge
            displayedText={product.category.name}
            link={`/categories/${product.category._id}`}
          />
          {/* Title */}
          <ProductTitle
            displayedText={product.title}
            className="text-3xl! font-bold!"
          />
          {/* Brand */}
          <BrandName
            displayedText={product.brand.name}
            link={`/brands/${product.brand._id}`}
          />
          {/* Ratings */}
          <div className="flex md:flex-row flex-col md:items-center md:gap-2 gap-1 mb-4">
            <Ratings rating={product.ratingsAverage} />
            <span className=" text-gray-500">
              ({product.ratingsQuantity} reviews)
            </span>
          </div>

          {/* Price */}
          <ProductPrice
            displayedText={`${product.price} EGP`}
            className="text-3xl!"
          />

          {/* Stock & Sold */}
          <div className="flex md:flex-row md:items-center flex-col md:gap-5 gap-1 mb-6 text-sm text-gray-600">
            <p>
              {product.quantity > 0
                ? `✅ ${product.quantity} in stock`
                : "❌ Out of stock"}
            </p>
            <p>🔥 {product.sold} sold</p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <AddToCartButton id={product._id} className="flex-1" />
            <AddToWishlistButton productId={product._id} />
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>
      <div className="my-10 border-t pt-5">
        <h2 className="text-2xl font-bold mb-6">
          <span className="text-accent">Related</span> Products
        </h2>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
          {numberOfProducts.map((_, index) => (
            <ProductCard key={index} product={categoryProducts[index]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
