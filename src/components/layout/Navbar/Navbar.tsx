"use client";
import React, { useState } from "react";
import Logo from "@/components/ui/Logo";
import ProfileDropdown from "@/components/ui/ProfileDropdown";
import NavCart from "@/components/ui/NavCart";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMenu, LuX } from "react-icons/lu";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const links = [
    { path: "/products", label: "Products" },
    { path: "/categories", label: "Categories" },
    { path: "/brands", label: "Brands" },
  ];

  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const session = useSession();

  return (
    <>
      <nav className="bg-secondary/70 backdrop-blur-md py-4 shadow sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <Logo />

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  className={`relative font-medium transition-colors duration-200 ${
                    path === link.path
                      ? "text-accent after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-accent after:scale-x-100"
                      : "text-black dark:text-neutral-200 hover:text-accent"
                  }`}
                  href={link.path}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center md:gap-5 gap-2">
            <ProfileDropdown />
            {session.status == "authenticated" && <NavCart />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden z-30"
            >
              {isOpen ? <LuX size={28} /> : <LuMenu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className={`fixed top-0 right-0 w-3/4 h-screen bg-accent text-white flex flex-col items-center justify-center gap-10 text-3xl z-20 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.path}
            className={`font-semibold ${
              path === link.path ? "text-yellow-300" : "hover:text-gray-200"
            }`}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
