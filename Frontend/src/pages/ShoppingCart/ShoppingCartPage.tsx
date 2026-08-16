import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import CartItem from "../../features/cart/ui/CartItem";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function ShoppingCartPage() {
  const items = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center gap-5 mt-5">
        <Button onClick={() => navigate(-1)}> Назад </Button>
        <h2 className="text-2xl ">
          Продуктов в корзине:{" "}
          {items.reduce((acc, item) => acc + item.count, 0)} позиции.
        </h2>
        <Button> Оформить заказ</Button>
      </div>

      <div className="grid grid-cols-4 mt-10">
        {items.map((item) => (
          <CartItem
            id={item.id}
            price={item.price}
            imageUrl={item.imageUrl}
            name={item.name}
            quantity={item.quantity}
          />
        ))}
      </div>
    </>
  );
}
