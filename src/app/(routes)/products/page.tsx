"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/product.type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import Loading from "@/app/loading";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products?${query}`
        );
        const { data } = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [filters]);

  const handleChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilter = () => {
    setFilters({});
  };

  return (
    <div className="container my-16">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold">
            <span className="text-accent">Latest</span> Products:
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Showing {products.length} products
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-2 cursor-pointer">
              <Filter /> Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 max-w-full p-4 mx-5 space-y-4">
            {/* Sort */}
            <div>
              <Label className="mb-2">Sort by</Label>
              <Select
                value={filters.sort || ""}
                onValueChange={(val) => handleChange("sort", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price (Low → High)</SelectItem>
                  <SelectItem value="-price">Price (High → Low)</SelectItem>
                  <SelectItem value="-createdAt">Newest</SelectItem>
                  <SelectItem value="createdAt">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="flex gap-2">
              <div className="flex flex-col flex-1">
                <Label className="mb-2">Min Price</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters["price[gte]"] || ""}
                  onChange={(e) => handleChange("price[gte]", e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-1">
                <Label className="mb-2">Max Price</Label>
                <Input
                  type="number"
                  placeholder="10000"
                  value={filters["price[lte]"] || ""}
                  onChange={(e) => handleChange("price[lte]", e.target.value)}
                />
              </div>
            </div>

            {/* Clear Filters */}
            <span
              onClick={clearFilter}
              className="text-sm text-neutral-500 hover:underline cursor-pointer block"
            >
              Clear Filters
            </span>
          </PopoverContent>
        </Popover>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:gap-5 gap-2">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or browse all products.
              </p>
              <Button onClick={clearFilter}>Reset Filters</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
