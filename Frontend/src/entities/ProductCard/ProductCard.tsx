import React from "react";
import "./ProductCard.css";

export default function ProductCard({ name, description, quantity }) {
  return (
    <div className="productCard">
      <div></div>
      <div>
        <h2>{name}</h2>
        <p>{description}</p>
        <span>{quantity}</span>
        <span></span>
        <button>Добавить в корзину</button>
      </div>
    </div>
  );
}
