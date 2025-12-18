import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token"); // ou autre moyen d'auth
  if (!token) {
    // redirige vers login si non authentifié
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
