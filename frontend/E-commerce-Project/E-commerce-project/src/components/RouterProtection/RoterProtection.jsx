import { Navigate } from "react-router-dom"

export const RouterProtection = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) {
    return <Navigate to="/Login" />
  }
  return children;
}