import { Product } from "@/types/product.type";

export default async function getAllProducts() {
  const response = await fetch(
    `${process.env.API_URL}/products?sort=createdAt`
  );
  const { data: products }: { data: Product[] } = await response.json();

  return products;
}
