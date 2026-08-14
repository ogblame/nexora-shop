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
import { Dropdown, Space, Avatar } from "antd";
import { useNavigate } from "react-router-dom";

export default function AppHeader() {
  const auth = useContext(AuthContext);
  const { user, logout } = auth;
  const navigate = useNavigate();

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
          <h1 className="header-logo">Nexora</h1>
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
          <div className="header-actions">
            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="header-button"
              >
                Авторизация / Регистрация
              </button>
            ) : (
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar>{user.fullName[0]}</Avatar>
                  </Space>
                </a>
              </Dropdown>
            )}

            <ShoppingCartOutlined style={{ fontSize: "22px" }} />
          </div>
        </div>
      </div>
    </header>
  );
}
