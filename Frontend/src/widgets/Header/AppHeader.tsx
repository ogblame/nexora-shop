import "./Header.css";
import CustomLink from "../../shared/UI/CustomLink.tsx";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.tsx";
import {
  DownOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Avatar, Button, Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store.ts";

export default function AppHeader() {
  const auth = useContext(AuthContext);
  const { user, logout } = auth;
  const navigate = useNavigate();
  console.log(user.role);

  const shoppingCartItems = useSelector((state: RootState) => state.cart.items);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: user?.fullName,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Профиль",
      icon: <ProfileOutlined />,
      extra: "⌘P",
    },
    {
      key: "3",
      label: "Настройки",
      icon: <SettingOutlined />,
      extra: "⌘S",
    },
    {
      key: "4",
      label: "Выйти",
      icon: <LogoutOutlined />,
      extra: "⌘L",
      onClick: logout,
    },
  ];
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link className="header-logo" to="/">
            Nexora
          </Link>
          <nav className="header-menu">
            <ul className="header-list">
              <li className="header-item">
                <CustomLink className="header-link" to="/">
                  Главная
                </CustomLink>
              </li>
              <li className="header-item">
                <CustomLink className="header-link" to="/catalog">
                  Каталог
                </CustomLink>
              </li>
              <li className="header-item">
                <CustomLink className="header-link" to="/about">
                  О нас
                </CustomLink>
              </li>
            </ul>
          </nav>
          <div className="header-actions flex items-center">
            {/* {user.role === "ADMIN" && <Button>Админ панель</Button>} */}
            {!user ? (
              <Button
                onClick={() => navigate("/login")}
                className="header-button"
              >
                Авторизация / Регистрация
              </Button>
            ) : (
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar>{user.fullName[0]}</Avatar>
                  </Space>
                </a>
              </Dropdown>
            )}
            <Badge
              count={shoppingCartItems.reduce(
                (acc, item) => acc + item.count,
                0,
              )}
            >
              <div
                onClick={() => navigate("/shoppingcart")}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-color"
              >
                <ShoppingCartOutlined
                  className=""
                  style={{ fontSize: "28px" }}
                />
              </div>
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
