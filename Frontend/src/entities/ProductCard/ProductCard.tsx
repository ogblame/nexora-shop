import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import type { Product } from "../Product/model/types";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/model/cartSlice";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string | null;
  product: Product;
};

export default function ProductCard({
  id,
  name,
  price,
  imageUrl,
  product,
}: ProductCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="w-[280px] overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="h-[220px] w-full object-cover"
        />
      )}

      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold">{name}</h3>

        <p className="mb-4 text-xl font-bold">{price} ₽</p>

        <div className="flex justify-between">
          <Button onClick={() => navigate(`/product/${id}`)}>
            Подробнее о товаре
          </Button>
          <ShoppingCartOutlined
            onClick={() => dispatch(addToCart(product))}
            className="cursor-pointer"
            style={{ fontSize: "28px" }}
          />
        </div>
      </div>
    </div>
  );
}
