import React, { useContext } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Button, Card, Divider, Form, Input, List, Typography } from "antd";
import { AuthContext } from "../../context/AuthContext";

export default function CheckoutPage() {
  const items = useSelector((state: RootState) => state.cart.items);
  const { user } = useContext(AuthContext);
  return (
    <div className="grid grid-cols-2 gap-8 mt-8">
      <Card title="Данные получателя">
        <Form>{user.fullName}</Form>
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

        <Typography.Title level={3}>Итого: 120 000 ₽</Typography.Title>

        <Button type="primary" size="large" block>
          Подтвердить заказ
        </Button>
      </Card>
    </div>
  );
}
