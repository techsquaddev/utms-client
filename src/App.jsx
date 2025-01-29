import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  matchPath,
} from "react-router-dom";
import {
  AdminRoute,
  DashboardLayout,
  HiddenRoute,
  MainLayout,
  NotFound,
  PrivateRoute,
} from "./components";
import {
  Home,
  Timetable,
  Find,
  About,
  Contact,
  Login,
  VerifyToken,
  Dashboard,
  Timetables,
  Sessions,
  Register,
  VerifyEmail,
  Users,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { AuthProvider } from "./api/authContext";

const App = () => {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <Main />
        </AuthProvider>
      </Router>
    </div>
  );
};

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedTimetable = localStorage.getItem("timetable");

    const blacklist = ["/", "/timetables/find"];

    const currentPath = location.pathname;

    // Check if the current path matches any in the blacklist
    const isBlacklisted = blacklist.some((path) =>
      matchPath({ path, exact: true }, currentPath)
    );

    if (storedTimetable && isBlacklisted) {
      const timetable = JSON.parse(storedTimetable);
      if (timetable && timetable._id) {
        navigate(`/timetables/${timetable._id}`, { replace: true });
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className="main">
      <ToastContainer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/timetables/:timetableId" element={<Timetable />} />
          <Route path="/timetables/find" element={<Find />} />
          <Route path="" element={<HiddenRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify/login" element={<VerifyToken />} />
            <Route path="/verify/email" element={<VerifyEmail />} />
          </Route>
        </Route>

        {/* Private Routes */}
        <Route path="" element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/timetables" element={<Timetables />} />
            <Route
              path="/dashboard/timetables/:timetableId/sessions"
              element={<Sessions />}
            />
            {/* Admin Routes */}
            <Route path="" element={<AdminRoute />}>
              <Route path="/dashboard/users" element={<Users />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <div className="gradient" />
    </div>
  );
};

export default App;
