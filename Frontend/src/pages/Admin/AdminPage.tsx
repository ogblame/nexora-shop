import React, { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  Select,
  InputNumber,
  Space,
  Table,
  Tag,
} from "antd";
import "./AdminPage.css";

const { Column, ColumnGroup } = Table;

export default function AdminPage() {
  const [form] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [formMode, setIsFormMode] = useState(null);
  const [edditingProduct, setEdditingProduct] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addProduct = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error("Не удалось добавить товар");
      }
      const newProduct = await response.json();
      setProducts((prev) => [...prev, newProduct]);
      form.resetFields();
      setIsAdding(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUTCH",
      });
      const updateProduct = response.json();
      if (!response.ok) {
        throw new Error("Не удалось изменить товар");
      }
      setProducts((prev) => prev.splice(id, 1, updateProduct));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Не удалось удалить товар");
      }
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const cancel = () => {
    setIsFormMode(null);
    form.resetFields();
  };

  const submitForm = (values) => {
    if (formMode === "create") {
      addProduct(values);
    }

    if (formMode === "edit") {
      updateProduct(values);
    }
  };

  return (
    <div className="admin">
      {!formMode && (
        <Button
          onClick={() => setIsFormMode("create")}
          type="primary"
          htmlType="submit"
        >
          Добавить продукт
        </Button>
      )}

      <Table className="products__list" dataSource={products}>
        <Column title="Название товара" dataIndex="name" key="name" />
        <Column title="Описание" dataIndex="description" key="description" />
        <Column title="Количество" dataIndex="quantity" key="quantity" />
        <Column title="Цена $" dataIndex="price" key="price" />
        <Column
          title="Действия"
          key="action"
          render={(_: any, record) => (
            <Space size="medium">
              <a
                onClick={() => {
                  setIsFormMode("edit");
                  setEdditingProduct(record);
                  form.setFieldsValue(record);
                }}
              >
                Редактировать
              </a>
              <a onClick={() => deleteProduct(record.id)}>Удалить</a>
            </Space>
          )}
        />
      </Table>

      {formMode !== null && (
        <Form
          onFinish={submitForm}
          form={form}
          scrollToFirstError={{
            behavior: "instant",
            block: "end",
            focus: true,
          }}
          style={{ paddingBlock: 32 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item name="name" label="Название">
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Описание">
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item name="quantity" label="Количество">
            <InputNumber />
          </Form.Item>

          <Form.Item name="price" label="Цена">
            <InputNumber />
          </Form.Item>

          {/* <Form.Item label="Категории" name="category">
        <Select
          options={[
            { label: "Designer", value: "designer" },
            { label: "Developer", value: "developer" },
            { label: "Product Manager", value: "product-manager" },
          ]}
        />
      </Form.Item> */}

          <Form.Item label={null}>
            <Flex gap="small">
              <Button type="primary" htmlType="submit">
                {formMode === "create" ? "Добавить" : "Внести изменения"}
              </Button>
              <Button danger onClick={cancel}>
                Отменить
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
