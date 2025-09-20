import { Category } from "@/types/category.type";

export default async function getAllCategories() {
  const response = await fetch(`${process.env.API_URL}/categories`);
  const { data: categories }: { data: Category[] } = await response.json();

  return categories;
}
