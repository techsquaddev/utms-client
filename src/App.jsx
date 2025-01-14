import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { DashboardLayout, MainLayout } from "./components";
import {
  Home,
  AddTimetable,
  UpdateTimetable,
  ManageSessions,
  Timetable,
  Find,
  About,
  Contact,
  AdminLogin,
  VerifyToken,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import { Dashboard } from "./admin";
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
    const whitelist = [
      "/about",
      "/contact",
      "/login",
      "/auth/login",
      "/admin/dashboard",
      "/timetables/add",
      "/timetables/update/:timetableId",
      "/timetables/sessions/:timetableId",
    ];
    const currentPath = location.pathname;

    if (storedTimetable && !whitelist.includes(currentPath)) {
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
          <Route path="/auth/login" element={<VerifyToken />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/timetables/:timetableId" element={<Timetable />} />
          <Route path="/timetables/find" element={<Find />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute requiredRole="admin">
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/timetables/add"
            element={
              <PrivateRoute requiredRole="admin">
                <AddTimetable />
              </PrivateRoute>
            }
          />
          <Route
            path="/timetables/update/:timetableId"
            element={
              <PrivateRoute requiredRole="admin">
                <UpdateTimetable />
              </PrivateRoute>
            }
          />
          <Route
            path="timetables/sessions/:timetableId"
            element={
              <PrivateRoute requiredRole="admin">
                <ManageSessions />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
      <div className="gradient" />
    </div>
  );
};

export default App;
