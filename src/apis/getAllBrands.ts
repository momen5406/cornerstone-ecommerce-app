import { Brand } from "@/types/Brand.type";

export default async function getAllBrands() {
  const response = await fetch(`${process.env.API_URL}/brands`);
  const { data: brands }: { data: Brand[] } = await response.json();

  return brands;
}
