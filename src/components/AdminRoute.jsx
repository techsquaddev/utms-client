import { useAuth } from "@/api/authContext";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useAuth();

  return user?.role === "admin" ? (
    <Outlet />
  ) : (
    <div>Only admins have access to this page.</div>
  );
};

export default AdminRoute;
