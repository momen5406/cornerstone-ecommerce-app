import CategorySection from "@/components/layout/Category/CategorySection";
import Header from "@/components/layout/Header/Header";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/product.type";
import getAllProducts from "../apis/getAllProducts";

export default async function Home() {
  const products: Product[] = await getAllProducts();

  return (
    <>
      <div className="container">
        <Header />

        <CategorySection className="mb-10" />

        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-5 gap-2 my-10">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </>
  );
}
