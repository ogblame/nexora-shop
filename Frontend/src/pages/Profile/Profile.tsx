import { Card, Descriptions, Divider, Form, List, Tag, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

type Order = {};

export default function Profile() {
  const [orders, setOrders] = useState([]);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/orders/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const dataOrders = await response.json();
        console.log(dataOrders);
        setOrders(dataOrders.orders);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex flex-col gap-6 py-8">
      <Card title="Мои данные">
        {" "}
        <Descriptions column={1}>
          <Descriptions.Item label="Имя">{user?.fullName}</Descriptions.Item>

          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>

          <Descriptions.Item label="Телефон">
            {user?.phone || "Не указан"}
          </Descriptions.Item>

          <Descriptions.Item label="Адрес доставки">
            {user?.deliveryAddress || "Не указан"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="Мои заказы">
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Card
              key={order.id}
              size="small"
              title={`Заказ №${order.id}`}
              extra={<Tag>{order.status}</Tag>}
            >
              <Typography.Text type="secondary">
                {new Date(order.createdAt).toLocaleDateString("ru-RU")}
              </Typography.Text>

              <List
                className="mt-4"
                dataSource={order.items}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={item.product.name}
                      description={`Количество: ${item.count}`}
                    />

                    <Typography.Text strong>
                      {item.price * item.count} ₽
                    </Typography.Text>
                  </List.Item>
                )}
              />

              <Divider />

              <div className="flex justify-between items-center">
                <Typography.Text type="secondary">
                  Адрес: {order.deliveryAddress}
                </Typography.Text>

                <Typography.Title level={4} className="!m-0">
                  Итого: {order.totalPrice} ₽
                </Typography.Title>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
