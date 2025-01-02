import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { MainLayout } from "./components";
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
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import { Dashboard } from "./admin";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Main />
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
      "/admin/login",
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
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/timetables/:timetableId" element={<Timetable />} />
          <Route path="/timetables/find" element={<Find />} />

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
        </Routes>
      </MainLayout>
      <div className="gradient" />
    </div>
  );
};

export default App;
