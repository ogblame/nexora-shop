import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import type { Product } from "../Product/model/types";
import mainPhoto from "../../../../backend/uploads/preview.jpg";

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
}: Partial<Product>) {
  const navigate = useNavigate();

  console.log("imageUrl:", imageUrl);
  return (
    <div className="w-[280px] overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={!imageUrl ? mainPhoto : `http://localhost:3000${imageUrl}`}
        alt={name}
        className="h-[220px] w-full object-cover"
      />

      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold">{name}</h3>

        <p className="mb-4 text-xl font-bold">{price} ₽</p>

        <div>
          <Button onClick={() => navigate(`/product/${id}`)}>
            Подробнее о товаре
          </Button>
        </div>
      </div>
    </div>
  );
}
