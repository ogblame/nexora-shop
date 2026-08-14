import React, { useEffect, useState } from "react";
import ProductCard from "../../entities/ProductCard/ProductCard";
import "./HomePage.css";
import { fetchProducts } from "../../shared/api/api.js";
import type { Product } from "../../entities/Product/model/types.js";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((dataProducts: Product[]) => setProducts(dataProducts))
      .catch((err: Error) => console.log(err));
  }, []);

  return (
    <div>
      Привет, ты на главной странице!
      <div className="product__list">
        {products.length !== 0
          ? products.map((product: Product) => (
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))
          : "Товары не найдены =("}
      </div>
    </div>
  );
}
