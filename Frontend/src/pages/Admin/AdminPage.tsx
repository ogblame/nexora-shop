import React from "react";
import { Button, Flex, Form, Input, Select, InputNumber } from "antd";

export default function AdminPage() {
  const [form] = Form.useForm();

  const submitForm = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      form.resetFields();
    }
  };

  return (
    <Form
      onFinish={submitForm}
      form={form}
      scrollToFirstError={{ behavior: "instant", block: "end", focus: true }}
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
            Добавить продукт
          </Button>
          <Button danger onClick={() => form.resetFields()}>
            Отменить
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
}
