import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "../../widgets/Header/AppHeader";
import "../../shared/styles/global.css";

export default function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />

      <main className="flex-1 bg-gray-100">
        <div className="container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
