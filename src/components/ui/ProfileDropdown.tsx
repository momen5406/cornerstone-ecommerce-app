import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LuUserRound } from "react-icons/lu";
import { Button } from "./button";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const ProfileDropdown = () => {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 hover:text-accent cursor-pointer">
        <LuUserRound size={25} />
        <span className="md:block hidden">Account</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {session.status == "authenticated" ? (
            <Button
              className="w-full"
              onClick={() =>
                signOut({
                  callbackUrl: "/login",
                })
              }
            >
              Sign Out
            </Button>
          ) : (
            <Button className="w-full">
              <Link href={"/login"}>Login</Link>
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/account"}>My Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/allorders"}>My Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/wishlist"}>My Wishlist</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/address"}>My Addresses</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
