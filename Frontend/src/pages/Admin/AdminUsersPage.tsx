import { Space, Table } from "antd";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type User = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handeleRoleChange = async (userId: number, role: string) => {
    fetch(`http://localhost:3000/api/users/${userId}/role`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({ role }),
    })
      .then((res) => res.json())
      .then((user) =>
        setUsers((prev) =>
          prev.map((item) => (item.id === user.id ? user : item)),
        ),
      );
  };

  return (
    <div>
      <Table className="products__list" dataSource={users}>
        <Column title="Ник" dataIndex="fullName" key="fullName" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Роль" dataIndex="role" key="role" />
        <Column
          title="Дата регистрации"
          dataIndex="createdAt"
          key="createdAt"
        />
        <Column
          title="Действия"
          key="action"
          render={(_: any, record) => (
            <Space size="medium">
              {record.role === "USER" ? (
                <a onClick={() => handeleRoleChange(record.id, "ADMIN")}>
                  Сделать админом
                </a>
              ) : (
                <a onClick={() => handeleRoleChange(record.id, "USER")}>
                  Снять админа
                </a>
              )}
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
