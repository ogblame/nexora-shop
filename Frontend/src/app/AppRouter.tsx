import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../pages/About/AboutPage.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import HomePage from "../pages/Home/HomePage.tsx";
import CatalogPage from "../pages/Catalog/CatalogPage.tsx";
import MainLayout from "./AppLayout/AppLayout.tsx";
import AdminPage from "../pages/Admin/AdminPage.tsx";
import LoginPage from "../pages/Auth/LoginPage.tsx";
import RegisterPage from "../pages/Auth/RegisterPage.tsx";
import ProductDetail from "../pages/ProductDetail/ProductDetail.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "catalog", element: <CatalogPage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "product/:productId", element: <ProductDetail /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
