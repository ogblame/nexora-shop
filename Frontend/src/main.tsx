import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./shared/styles/global.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/AppRouter.tsx";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
