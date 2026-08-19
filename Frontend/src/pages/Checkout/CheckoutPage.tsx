import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  List,
  message,
  Result,
  Spin,
  Typography,
} from "antd";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../features/cart/model/cartSlice";

export default function CheckoutPage() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const itemsPrices = items.reduce((acc, item) => {
    const itemPrice = item.count * item.price;
    return acc + itemPrice;
  }, 0);

  const [isSuccess, setIsSuccess] = useState(false);

  const onFinish = async (values) => {
    const orderData = {
      phone: values.phone,
      deliveryAddress: values.deliveryAddress,
      totalPrice: itemsPrices,
      items: items,
    };

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        message.error("Ошибка запроса");
        return;
      }

      const order = await response.json();

      if (order) {
        setIsSuccess(true);
        dispatch(clearCart());

        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
    } catch (err) {
      message.error(`Заказ не создан по причине: ${err}`);
    }
  };

  if (isSuccess) {
    return (
      <Result
        status="success"
        title="Заказ успешно оформлен!"
        subTitle="Перенаправляем вас на главную страницу..."
        extra={<Spin size="large" />}
      />
    );
  }
  return (
    <Form onFinish={onFinish}>
      <div className="grid grid-cols-2 gap-8 mt-8">
        <Card title="Данные получателя">
          <Form.Item>Ваше имя: {user?.fullName}</Form.Item>
          <Form.Item>Ваша почта: {user?.email}</Form.Item>
          {!user.phone ? (
            <Form.Item
              label="Номер телефона:"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Введите номер телефона",
                },
                {
                  pattern: /^\+7\d{10}$/,
                  message: "Введите номер в формате +79991234567",
                },
              ]}
            >
              <Input placeholder="+7" />
            </Form.Item>
          ) : (
            <Form.Item>Ваш номер телефона: {user?.phone}</Form.Item>
          )}
          {!user.deliveryAddress ? (
            <Form.Item
              label="Адрес доставки"
              name="deliveryAddress"
              rules={[{ required: true, message: "Введите адрес доставки" }]}
            >
              <Input placeholder="Москва, ул. ..." />
            </Form.Item>
          ) : (
            <Form.Item>Адрес доставки: {user?.deliveryAddress}</Form.Item>
          )}
        </Card>
        <Card title="Ваш заказ:">
          {items.map((item) => (
            <List key={item.id}>
              <p>Название: {item.name}</p>
              <p>Количество: {item.count}</p>
              <p>Цена: {item.count * item.price} рублей</p>
              <Divider />
            </List>
          ))}

          <Typography.Title level={3}>Итого: {itemsPrices} ₽</Typography.Title>

          <Button htmlType="submit" type="primary" size="large" block>
            Подтвердить заказ
          </Button>
        </Card>
      </div>
    </Form>
  );
}
