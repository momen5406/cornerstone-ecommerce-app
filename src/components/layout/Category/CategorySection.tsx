import React from "react";
import { Category } from "@/types/category.type";
import CategorySlider from "@/components/features/CategorySlider";

const CategorySection = async ({ className }: { className?: string }) => {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  const { data: categories }: { data: Category[] } = await response.json();

  return (
    <div className={className}>
      <CategorySlider categories={categories} />
    </div>
  );
};

export default CategorySection;
