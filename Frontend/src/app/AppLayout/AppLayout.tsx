import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "../../widgets/Header/AppHeader";
import "../../shared/styles/global.css";

export default function AppLayout() {
  return (
    <Layout>
      <AppHeader />
      <main className="container">
        <Outlet />
      </main>
    </Layout>
  );
}
