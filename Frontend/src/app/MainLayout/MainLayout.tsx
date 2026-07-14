import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../widgets/Header/Header";

export default function MainLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
