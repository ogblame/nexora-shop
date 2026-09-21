import { Button, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/my", {
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
  }, [token]);

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
          render={() => (
            <Space>
              <Button>Изменить статус</Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
