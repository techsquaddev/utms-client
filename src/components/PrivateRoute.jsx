import { useAuth } from "@/api/authContext";
import { Loading } from "@/pages";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
