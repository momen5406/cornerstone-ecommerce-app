"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

const Footer = () => {
  const links = [
    {
      head: "Quick Links",
      quickLinks: ["products", "categories", "brands", "wishlist", "cart"],
    },
    {
      head: "Customer Support",
      quickLinks: [
        "Help Center",
        "Shipping & Returns",
        "Track Your Order",
        "FAQs",
        "Contact Us",
      ],
    },
    {
      head: "Company",
      quickLinks: [
        "About Us",
        "Careers",
        "Terms & Conditions",
        "Privacy Policy",
      ],
    },
  ];

  return (
    <footer className="bg-secondary text-neutral-700 dark:text-neutral-300">
      <div className="container py-10">
        {/* Newsletter */}
        <div className="flex md:flex-row flex-col items-center justify-between gap-5 bg-white dark:bg-neutral-800 rounded-2xl shadow px-6 py-5">
          <p className="text-xl font-semibold text-center md:text-left">
            Stay updated with our latest offers
          </p>
          <div className="flex w-full max-w-md items-center gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-neutral-100 dark:bg-neutral-700"
            />
            <Button type="submit" className="px-6">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Links */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-8 gap-y-10 my-10 border-t border-b py-8">
          {links.map((link, index) => (
            <div key={index} className="sm:text-left text-center">
              <h5 className="font-semibold text-lg mb-4 text-neutral-900 dark:text-neutral-100">
                {link.head}
              </h5>
              <ul className="space-y-2">
                {link.quickLinks.map((quickLink, i) => (
                  <li
                    key={i}
                    className="capitalize text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors duration-200"
                  >
                    {quickLink}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div className="sm:text-left text-center">
            <h5 className="font-semibold text-lg mb-4 text-neutral-900 dark:text-neutral-100">
              Connect With Us
            </h5>
            <div className="flex sm:justify-start justify-center gap-4">
              <Link
                href="#"
                className="p-2 rounded-full hover:bg-accent/10 transition-colors"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full hover:bg-accent/10 transition-colors"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full hover:bg-accent/10 transition-colors"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full hover:bg-accent/10 transition-colors"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
          &copy; 2025{" "}
          <span className="text-accent font-semibold">CornerStone</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
