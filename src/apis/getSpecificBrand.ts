import { Product } from "@/types/product.type";

export default async function getSpecificBrand(id: string) {
  const response = await fetch(`${process.env.API_URL}/products?brand=${id}`);
  const { data: brandProducts }: { data: Product[] } = await response.json();

  return brandProducts;
}
