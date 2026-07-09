import React from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
  const { data: user, isLoading, isError } = useUser();

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user.data) {
    navigate("/login");
  }

  return children;
}

export default ProtectedRoute;
