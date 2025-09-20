import Loading from "@/app/loading";
import BrandName from "@/components/ui/BrandName";
import { Button } from "@/components/ui/button";
import CategoryBadge from "@/components/ui/CategoryBadge";
import ProductPrice from "@/components/ui/ProductPrice";
import ProductTitle from "@/components/ui/ProductTitle";
import QuantitySelector from "@/components/ui/QuantitySelector";
import { CartContext } from "@/context/CartContext";
import { Item } from "@/types/Cart.type";
import { Loader2, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

const CartProduct = ({ product }: { product: Item }) => {
  const { setCartData, getUserCart, cartData } = useContext(CartContext);
  const [isClearing, setIsClearing] = useState(false);
  const session = useSession();

  const deleteItem = async ({ id }: { id: string }) => {
    setIsClearing(true);
    const response = await fetch(`/api/cart/${id}`, {
      method: "DELETE",
      headers: {
        token: session.data?.token + "",
      },
    });

    const data = await response.json();
    setCartData(data);
    setIsClearing(false);
    toast.success("Item removed from your cart.");
  };

  if (
    typeof cartData?.data.products[0]?.product == "string" ||
    cartData == null
  ) {
    getUserCart();
  }

  return (
    <div className=" border rounded-xl p-5 flex gap-6 relative shadow-sm hover:shadow-md transition">
      {/* Delete Button Top-Right */}
      {isClearing ? (
        <Loader2 className="absolute top-5 right-5 text-red-500 transition duration-300 animate-spin" />
      ) : (
        <Button
          variant="ghost"
          className="cursor-pointer absolute top-3 right-3 text-red-500 hover:bg-red-100 hover:text-red-500"
          onClick={() => {
            deleteItem({ id: product.product._id });
          }}
        >
          <Trash className="h-5 w-5" />
        </Button>
      )}

      {/* Product Image */}
      <div className="img w-32 shrink-0">
        <Image
          src={product.product.imageCover}
          alt={product.product.title}
          width={120}
          height={120}
          priority
          className="w-full h-full object-cover rounded-lg bg-gray-100"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between flex-1">
        {/* Category */}
        {product.product.category.name && (
          <CategoryBadge displayedText={product.product.category.name} />
        )}

        {/* Title */}
        <ProductTitle
          displayedText={
            product?.product?.title
              ? product.product.title.split(" ").slice(0, 2).join(" ")
              : "Loading..."
          }
          link={`/productDetails/${product.product._id}`}
        />

        {/* Brand */}
        {product.product.brand.name && (
          <BrandName displayedText={product.product.brand.name} />
        )}

        {/* Price per unit */}
        <ProductPrice displayedText={`${product.price} EGP / UNIT`} />

        {/* Quantity Selector + Subtotal */}
        <QuantitySelector
          numberOfItems={product.count}
          priceOfOne={product.price}
          productId={product.product._id}
        />
      </div>
    </div>
  );
};

export default CartProduct;
