import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../pages/About/AboutPage.tsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage.tsx";
import HomePage from "../pages/Home/HomePage.tsx";
import CatalogPage from "../pages/Catalog/CatalogPage.tsx";
import MainLayout from "./MainLayout/MainLayout.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "catalog", element: <CatalogPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
