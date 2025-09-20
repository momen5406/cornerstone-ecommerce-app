import getAllCategories from "@/apis/getAllCategories";
import { Category } from "@/types/category.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Categories = async () => {
  const categories: Category[] = await getAllCategories();

  return (
    <div className="container my-16">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-8 text-center">
        Browse All <span className="text-accent">Categories</span>
      </h2>

      {/* Categories Grid */}
      <div className="grid items-stretch xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link href={`/categories/${category._id}`} key={category._id}>
            <div className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 cursor-pointer">
              {/* Category Image */}
              <Image
                src={category.image}
                alt={category.name}
                width={400}
                height={400}
                priority
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

              {/* Category Name */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full text-center">
                <h4 className="text-lg md:text-xl font-semibold text-white drop-shadow-md group-hover:text-accent transition-colors">
                  {category.name}
                </h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
