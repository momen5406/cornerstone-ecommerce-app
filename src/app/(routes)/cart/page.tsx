"use client";
import { Button } from "@/components/ui/button";
import CartProduct from "@/components/ui/CartProduct";
import { CartContext } from "@/context/CartContext";
import React, { useContext, useState } from "react";
import Loading from "./../../loading";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { WishlistContext } from "@/context/WishlistContext";
import { Loader2, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import CheckoutDialog from "@/components/features/CheckoutDialog";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { cartData, isLoading, setCartData } = useContext(CartContext);
  const [isClearing, setIsClearing] = useState(false);
  const session = useSession();

  const clearCart = async () => {
    setIsClearing(true);
    const response = await fetch(`/api/clearCart`, {
      method: "DELETE",
      headers: {
        token: session.data?.token + "",
      },
    });

    setCartData({
      status: "success",
      cartId: "",
      data: {
        products: [],
        totalCartPrice: 0,
        _id: "",
        cartOwner: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
      },
      numOfCartItems: 0,
    });
    setIsClearing(true);
    toast.success("Your cart is now empty.");
  };

  const { wishlist } = useContext(WishlistContext);
  const numberOfWishlistProducts = Array.from({ length: 5 });

  if (isLoading || typeof cartData?.data.products[0]?.product == "string") {
    return <Loading />;
  }

  return (
    <div className="container my-16">
      <>
        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h5 className="text-xl font-semibold">
                Your Cart{" "}
                <span className="text-gray-500 text-base">
                  ({cartData?.numOfCartItems || 0} items)
                </span>
              </h5>
              {cartData?.data?.products?.length > 0 && (
                <Button
                  variant="ghost"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 px-3 py-1 text-sm font-medium"
                  onClick={clearCart}
                >
                  {isClearing ? (
                    <Loader2 className=" text-red-500 transition duration-300 animate-spin" />
                  ) : (
                    "Clear Cart"
                  )}
                </Button>
              )}
            </div>

            {/* 🛠 Safe check for products */}
            {cartData?.data?.products?.length > 0 ? (
              cartData.data.products.map((product) =>
                product?.product ? (
                  <CartProduct product={product} key={product._id} />
                ) : null
              )
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-accent/10 text-accent p-4 rounded-full mb-4">
                  <ShoppingCart size={32} />
                </div>
                <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm">
                  Looks like you haven’t added anything to your cart yet.
                </p>
                <Button>
                  <Link href="/products">Start Shopping</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="sm:sticky sm:top-24 border rounded-xl p-6 bg-gray-50 shadow-sm hover:shadow-md transition flex flex-col">
              <h3 className="text-2xl font-bold mb-5 pb-2 border-b">
                Order Summary
              </h3>

              <ul className="divide-y text-sm">
                {cartData?.data?.products?.map(
                  (product) =>
                    product?.product && (
                      <li
                        key={product._id}
                        className="py-3 flex items-center justify-between"
                      >
                        <span className="font-medium">
                          <span>
                            {product.product.title
                              ?.split(" ")
                              .slice(0, 2)
                              .join(" ")}
                          </span>
                          <span className="text-gray-500 ml-2">
                            (x{product.count})
                          </span>
                        </span>
                        <span className="font-semibold">
                          {product.price * product.count} EGP
                        </span>
                      </li>
                    )
                )}
              </ul>

              <div className="flex items-center justify-between py-3 text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>

              <div className="border-t pt-4 mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-xl font-bold text-accent">
                  {cartData?.data?.totalCartPrice || 0} EGP
                </span>
              </div>

              <CheckoutDialog
                cartId={cartData.cartId}
                disabled={!cartData?.data?.products?.length}
              />
            </div>
          </div>
        </div>

        {/* Wishlist */}
        {wishlist.length != 0 && (
          <div className="mt-10">
            <h5 className="text-xl font-semibold mb-5">
              Products from your Wishlist:
            </h5>
            <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-5 gap-2">
              {numberOfWishlistProducts.map((_, index) =>
                index < wishlist.length && wishlist[index] ? (
                  <ProductCard product={wishlist[index]} key={index} />
                ) : null
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Cart;
