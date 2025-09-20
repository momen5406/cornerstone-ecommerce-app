import { Brand } from "./Brand.type";
import { Category } from "./category.type";
import { SubCategory } from "./subCategory.type";

export interface Wishlist {
  status: string;
  count: number;
  data: WishlistItem[];
}

export interface WishlistItem {
  sold: number;
  images: string[];
  subcategory: SubCategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount: number;
  availableColors: [];
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
