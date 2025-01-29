import { useAuth } from "@/api/authContext";
import { Navigate, Outlet } from "react-router-dom";

const HiddenRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default HiddenRoute;
