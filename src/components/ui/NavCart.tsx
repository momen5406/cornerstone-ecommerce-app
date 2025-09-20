import { ShoppingCartIcon } from "lucide-react";
import React, { useContext } from "react";
import { Badge } from "./badge";
import Link from "next/link";
import { CartContext } from "@/context/CartContext";

const NavCart = () => {
  const { cartData } = useContext(CartContext);

  return (
    <Link href={"/cart"}>
      <div className="flex items-center gap-1 hover:text-accent cursor-pointer relative">
        <ShoppingCartIcon size={25} />
        <Badge className="h-4 min-w-4 rounded-full px-1 font-mono tabular-nums absolute -top-2 -right-2">
          {cartData?.numOfCartItems}
        </Badge>
      </div>
    </Link>
  );
};

export default NavCart;
