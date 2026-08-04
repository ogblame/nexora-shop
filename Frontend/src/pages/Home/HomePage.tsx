import React, { useEffect, useState } from "react";
import ProductCard from "../../entities/ProductCard/ProductCard";
import "./HomePage.css";
import { fetchProducts } from "../../shared/api/api.js";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((dataProducts) => setProducts(dataProducts))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      Привет, ты на главной странице!
      <div className="product__list">
        {products.length !== 0
          ? products.map((product) => (
              <ProductCard
                name={product.name}
                description={product.description}
              />
            ))
          : "Товары не найдены =("}
      </div>
    </div>
  );
}
