import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
type ProtectedRouteProps = {
  children: React.ReactNode;
  role: "student" | "instructor" | "admin";
};
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  role
}) => {
  const {
    user,
    isLoading
  } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (user.role !== role) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};