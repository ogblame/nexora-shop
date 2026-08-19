import { Button, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function AdminOrdersPage() {
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
    <div>
      <Table rowKey="id" dataSource={orders}>
        <Column title="№ заказа" dataIndex="id" key="id" />

        <Column title="Пользователь" dataIndex="userId" key="userId" />

        <Column
          title="Сумма"
          dataIndex="totalPrice"
          key="totalPrice"
          render={(price) => `${price} ₽`}
        />

        <Column title="Статус" dataIndex="status" key="status" />

        <Column
          title="Адрес доставки"
          dataIndex="deliveryAddress"
          key="deliveryAddress"
        />

        <Column title="Телефон" dataIndex="phone" key="phone" />

        <Column
          title="Дата"
          dataIndex="createdAt"
          key="createdAt"
          render={(date) => new Date(date).toLocaleDateString("ru-RU")}
        />

        <Column
          title="Действия"
          key="action"
          render={(_, record) => (
            <Space>
              <Button>Изменить статус</Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
