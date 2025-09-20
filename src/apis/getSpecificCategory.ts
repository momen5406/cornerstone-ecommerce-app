import { Product } from "@/types/product.type";

export default async function getSpecificCategory(id: string) {
  const response = await fetch(
    `${process.env.API_URL}/products?category=${id}`
  );
  const { data: categoryProducts }: { data: Product[] } = await response.json();

  return categoryProducts;
}
