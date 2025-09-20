"use client";
import { WishlistItem } from "@/types/wishlist.type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext<{
  getUserWishlist: () => void;
  wishlist: WishlistItem[];
  wishlistIdProducts: string[];
  addToWishlist: (productId: string) => void;
  deleteFromWishlist: (productId: string) => void;
  isLoadingId: string | null;
  isLoading: boolean;
}>({
  getUserWishlist() {},
  wishlist: [],
  wishlistIdProducts: [],
  addToWishlist() {},
  deleteFromWishlist() {},
  isLoadingId: null,
  isLoading: false,
});

const WishlistContextProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [wishlistIdProducts, setWishlistIdProducts] = useState<string[]>([]);
  const [isLoadingId, setIsLoadingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const session = useSession();

  const getUserWishlist = async () => {
    if (!session.data) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/getWishlist");

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const { data }: { data: WishlistItem[] } = await response.json();
      setWishlist(data);
      setWishlistIdProducts(data.map((product) => product._id.toString()));
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    if (!session.data) {
      router.push("/login");
      return;
    }
    setIsLoadingId(productId);
    const response = await fetch("/api/addToWishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
    });

    const data = await response.json();

    console.log(data);
    setWishlist((prev) => [...prev, data.data]);
    setWishlistIdProducts((prev) => [...prev, productId]);
    setIsLoadingId(null);
    toast("Item saved to your wishlist.", {
      icon: "❤️",
    });
  };

  const deleteFromWishlist = async (productId: string) => {
    if (!session.data) {
      router.push("/login");
      return;
    }
    setIsLoadingId(productId);
    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: "DELETE",
      });

      await response.json();

      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      setWishlistIdProducts((prev) => prev.filter((id) => id !== productId));
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setIsLoadingId(null);
      toast("Item removed from your wishlist.", {
        icon: "🥹",
      });
    }
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      getUserWishlist();
    }
    if (session.status === "unauthenticated") {
      setWishlist([]);
      setWishlistIdProducts([]);
    }
  }, [session.status]);

  return (
    <WishlistContext.Provider
      value={{
        getUserWishlist,
        wishlist,
        wishlistIdProducts,
        addToWishlist,
        deleteFromWishlist,
        isLoading,
        isLoadingId,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
