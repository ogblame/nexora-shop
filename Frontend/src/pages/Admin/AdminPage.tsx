import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  InputNumber,
  Space,
  Table,
  message,
  Upload,
} from "antd";
import "./AdminPage.css";
import { UploadOutlined } from "@ant-design/icons";
import {
  fetchProducts,
  fetchAddProduct,
  fetchUpdatedProduct,
  fetchDeleteProduct,
} from "../../shared/api/api.js";
import type {
  CreateProduct,
  Product,
  UpdateProduct,
} from "../../entities/Product/model/types.ts";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

type ProductFormValues = CreateProduct & {
  upload?: {
    fileList?: {
      originFileObj?: File;
    }[];
  };
};
const { Column } = Table;

type formMode = "create" | "edit" | null;

export default function AdminPage() {
  const [form] = Form.useForm();
  const [products, setProducts] = useState<Product[]>([]);
  const [formMode, setIsFormMode] = useState<formMode>(null);
  const [edditingProduct, setEdditingProduct] = useState<Product | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then((dataProducts: Product[]) => setProducts(dataProducts))
      .catch((err: unknown) => {
        if (err instanceof Error) {
          console.log(err.message);
        }
        message.error("Не удалось загрузить продукты");
      });
  }, []);

  const addProduct = async (values: CreateProduct, image?: File) => {
    if (!image) {
      message.error("Добавьте изображение товара");
      return;
    }
    try {
      const newProduct = await fetchAddProduct(values, image);

      setProducts((prev) => [...prev, newProduct]);

      form.resetFields();
      setEdditingProduct(null);
      message.success("Товар успешно создан!");
    } catch (err) {
      message.error(`Ошибка при создании товара: ${err}`);
    }
  };

  const updateProduct = async (
    productId: number,
    updatedProduct: UpdateProduct,
  ) => {
    try {
      const updateProduct = await fetchUpdatedProduct(
        productId,
        updatedProduct,
      );

      setProducts((prev) =>
        prev.map((product) =>
          product.id === productId ? updateProduct : product,
        ),
      );
      setIsFormMode(null);
      message.success("Товар успешно обновлен!");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      await fetchDeleteProduct(productId);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      message.success("Товар успешно удален!");
    } catch (err) {
      message.error(`Не удалось удалить продукт по причине: ${err}`);
    }
  };

  const submitForm = (values: ProductFormValues) => {
    const image = values.upload?.fileList?.[0]?.originFileObj;
    if (formMode === "create") {
      addProduct(values as CreateProduct, image);
    }

    if (formMode === "edit" && edditingProduct) {
      updateProduct(edditingProduct.id, values as UpdateProduct);
    }
  };

  const cancel = () => {
    setIsFormMode(null);
    form.resetFields();
  };

  return (
    <div className="admin">
      <div className="flex gap-5">
        {!formMode && (
          <Button
            onClick={() => setIsFormMode("create")}
            type="primary"
            htmlType="submit"
          >
            Добавить продукт
          </Button>
        )}
        {location.pathname === "/admin/users" ? (
          <Button onClick={() => navigate("/admin")}>
            Закрыть список пользователей
          </Button>
        ) : (
          <Button type="primary" onClick={() => navigate("/admin/users")}>
            Cписок пользователей
          </Button>
        )}
        {location.pathname === "/admin/orders" ? (
          <Button onClick={() => navigate("/admin")}>
            {" "}
            Закрыть список заказов
          </Button>
        ) : (
          <Button onClick={() => navigate("orders")} type="primary">
            Список заказов
          </Button>
        )}
      </div>

      <Outlet />

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
                  setEdditingProduct(record as Product);
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

          <Form.Item name="upload" label="Фото товара">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Добавить</Button>
            </Upload>
          </Form.Item>

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
