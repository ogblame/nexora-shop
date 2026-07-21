import "./Header.css";
import CustomLink from "../../shared/UI/CustomLink.tsx";

export default function Header() {
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
            <button className="header-button">Авторизация</button>
            <button className="header-button">Корзина</button>
          </div>
        </div>
      </div>
    </header>
  );
}
