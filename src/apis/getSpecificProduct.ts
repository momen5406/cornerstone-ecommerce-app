import { Product } from "@/types/product.type";

export default async function getSpecificProducts(id: string) {
  const response = await fetch(`${process.env.API_URL}/products/${id}`);
  const { data: product }: { data: Product } = await response.json();

  return product;
}
