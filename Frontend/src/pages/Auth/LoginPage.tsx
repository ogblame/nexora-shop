import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import Password from "antd/es/input/Password";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function LoginPage() {
  const auth = useContext(AuthContext);
  const { setToken } = auth;
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) throw new Error("Запрос неверный");

      const data = await response.json();
      if (!data.token) {
        message.error("Нет такого");
      }
      localStorage.setItem("token", data.token);
      setToken(data.token);
      navigate("/");
      message.success("Вы успешно вошли!");
    } catch (err) {
      message.error("Ошибка в авторизации");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg flex flex-col justify-center">
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 400 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Почта"
            name="email"
            rules={[
              { required: true, message: "Пожалуйста введите Вашу почту!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Пожалуйста введите пароль!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
            label={null}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
            <Button onClick={() => navigate("/register")} type="primary">
              Регистрация
            </Button>
            <Button onClick={() => navigate("/")} type="primary">
              На главную страницу
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
