import React, { useContext, useEffect } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user || user === "USER") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
