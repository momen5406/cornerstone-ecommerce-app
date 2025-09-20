import getSpecificCategory from "@/apis/getSpecificCategory";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ui/ProductCard";
import { Grid } from "lucide-react";
import Link from "next/link";
import React from "react";

const SpecificCategory = async ({
  params,
}: {
  params: { categoryID: string };
}) => {
  const { categoryID } = params;

  const products = await getSpecificCategory(categoryID);

  if (products.length == 0) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <div className="bg-accent/10 text-accent p-4 rounded-full mb-4">
          <Grid size={32} />
        </div>
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
          No products found in this category
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-sm">
          Try exploring other categories or check back later.
        </p>
        <Button asChild>
          <Link href="/categories">Browse Categories</Link>
        </Button>
      </div>
    );
  }


  return (
    <div className="container my-16">
      <h2 className="text-2xl font-bold mb-5">
        <span className="text-accent">{products[0].category.name}</span>{" "}
        Products
      </h2>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-5 gap-2">
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default SpecificCategory;
