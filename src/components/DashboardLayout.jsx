import Logo from "../assets/sliit360.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/api/authContext";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const sideNavigation = [
    { key: "dashboard", label: "Dashboard", path: "/dashboard" },
    { key: "timetables", label: "Timetables", path: "/dashboard/timetables" },
    // { key: "notices", label: "Notices", path: "/dashboard/notices" },
    { key: "users", label: "Users", path: "/dashboard/users" },
    // { key: "profile", label: "Profile", path: "/dashboard/profile" },
    { key: "home", label: "Home", path: "/" },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden p-4">
        {/* Sidebar */}
        <div className="col-span-2 bg-gray-100/80 backdrop-blur-lg border rounded-lg flex flex-col justify-between p-4">
          <div>
            <Link to="/" className="flex justify-start">
              <div className="p-3 bg-primary rounded-xl shadow-lg max-w-fit">
                <img
                  className="w-16 object-contain md:w-20"
                  src={Logo}
                  alt="logo"
                />
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="mt-8 space-y-2">
              {sideNavigation
                .filter((item) => item.key !== "users" || user.role === "admin")
                .map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    className={`group flex items-center border p-3 cursor-pointer rounded-lg transition duration-200 ${
                      location.pathname === item.path
                        ? "bg-gray-200 font-medium"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
            </div>
          </div>

          {/* Logout Button */}
          {user && (
            <button
              onClick={logout}
              className="py-3 px-6 border flex cursor-pointer hover:bg-gray-200 transition duration-200 rounded-lg w-full text-left"
            >
              Logout
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-10 md:col-span-9 col-span-12 p-4 rounded-xl bg-gray-100/80 border backdrop-blur-lg max-h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
