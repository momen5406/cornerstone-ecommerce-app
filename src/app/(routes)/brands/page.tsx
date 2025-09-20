import getAllBrands from "@/apis/getAllBrands";
import { Brand } from "@/types/Brand.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Brands = async () => {
  const brands: Brand[] = await getAllBrands();

  return (
    <div className="container my-16">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-8 text-center">
        Browse All <span className="text-accent">Brands</span>
      </h2>

      {/* Brands Grid */}
      <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
        {brands.map((brand) => (
          <Link href={`/brands/${brand._id}`} key={brand._id}>
            <div className="group border rounded-xl bg-white shadow-sm hover:shadow-lg transition duration-300 p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-accent/50">
              {/* Brand Image */}
              <div className="w-28 h-28 flex items-center justify-center">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={120}
                  height={120}
                  priority
                  className="object-contain max-h-24 max-w-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Brand Name */}
              <h4 className="mt-4 text-sm font-medium text-gray-700 group-hover:text-accent transition-colors">
                {brand.name}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Brands;
