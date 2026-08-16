import React from "react";

import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import type { Product } from "../../../entities/Product/model/types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../app/store.ts";
import { deleteCart } from "../model/cartSlice.ts";

export default function CartItem({
  id,
  name,
  price,
  imageUrl,
  quantity,
}: Partial<Product>) {
  const items = useSelector((state: RootState) => state.cart.items);
  const cartItem = items.find((item) => item.id === id);
  const dispatch = useDispatch();
  const productInShoppingCart = useSelector(
    (state: RootState) => state.cart.items,
  ).find((item: Product) => item.id === id);

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
        <p className="text-[14px]">Количество в корзине: {cartItem?.count}</p>
        <p>
          Общая сумма товаров:{" "}
          {productInShoppingCart
            ? productInShoppingCart.price * productInShoppingCart.count
            : 0}
          ₽
        </p>

        <div>
          <Button onClick={() => dispatch(deleteCart(id))}>
            Удалить из корзины
          </Button>
        </div>
      </div>
    </div>
  );
}
