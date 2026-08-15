import React from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import type { Product } from "../../../entities/Product/model/types";

export default function CartItem({
  id,
  name,
  price,
  imageUrl,
  quantity,
}: Partial<Product>) {
  return (
    <div className="w-[250px] overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={`http://localhost:3000${imageUrl}`}
        alt={name}
        className="h-[220px] w-full object-cover"
      />

      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold">{name}</h3>

        <p className="mb-4 text-xl font-bold">{price} ₽</p>
        <p className="text-[14px]">Количество на складе: {quantity}</p>

        <div>
          <Button>Удалить из корзины</Button>
        </div>
      </div>
    </div>
  );
}
