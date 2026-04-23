import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./productsGrid";
import "./HomePage.css";
import type { CartItem, Product } from "../../types/cart";

type HomePageProps = {
  cart: CartItem[];
  loadCart: () => Promise<void>;
};

export function HomePage({ cart, loadCart }: HomePageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search ? `/api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data);
  };
    getHomeData();
    },[search]);

  return (
    <>
      <title>linkacademy-project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart = {loadCart} />
      </div>
    </>
  );
}
