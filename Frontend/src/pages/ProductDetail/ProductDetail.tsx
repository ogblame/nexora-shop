import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "../../entities/Product/model/types";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/model/cartSlice";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`http://localhost:3000/api/products/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const prevStep = () => {
    navigate(-1);
  };

  if (!product) {
    return <div>Продукт не найден =(</div>;
  }

  return (
    <>
      <Button className="mt-5" onClick={prevStep}>
        Вернуться назад
      </Button>
      <div className="mt-5 grid grid-cols-2 gap-12">
        <div className="rounded-2xl bg-gray-100">
          <img
            className="h-[500px] w-full object-contain"
            src={`http://localhost:3000${product.imageUrl}`}
          />
        </div>

        <div className="pt-5">
          <h2 className="text-5xl">{product.name}</h2>
          <p className="text-1xl mt-4.5">Описание: {product.description}</p>

          <p className="text-2xl mt-5">Цена: {product.price} рублей.</p>
          <p className="text-2xl">
            Осталось на складе: {product.quantity} позиции
          </p>

          <Button
            className="mt-5 w-50"
            onClick={() => dispatch(addToCart(product))}
          >
            Добавить в корзину
          </Button>
        </div>
      </div>
    </>
  );
}
