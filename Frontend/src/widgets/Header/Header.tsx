import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="header-logo">Nexora</h1>
          <nav className="header-menu">
            <ul className="header-list">
              <li className="header-item">
                <a className="header-link" href="">
                  Каталог
                </a>
              </li>
              <li className="header-item">
                <a className="header-link" href="">
                  О нас
                </a>
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
