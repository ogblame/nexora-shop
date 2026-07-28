import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState();

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      Привет, ты на главной странице!
      {/* {products.map((product) => (
        <li>{product.name}</li>
      ))} */}
    </div>
  );
}
