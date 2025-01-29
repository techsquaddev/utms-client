import { useAuth } from "@/api/authContext";
import { Navigate, Outlet } from "react-router-dom";
import { Loading } from ".";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
