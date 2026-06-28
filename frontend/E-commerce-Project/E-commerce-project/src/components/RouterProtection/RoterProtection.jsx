import { Navigate } from "react-router-dom"

export const RouterProtection = ({ children, allowedRoles = [] }) => {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}