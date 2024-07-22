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
  Dashboard,
  Timetable,
  Find,
  About,
  AdminLogin,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

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
    const timetableId = localStorage.getItem("timetableId");
    const whitelist = ["/about", "/contact"];
    const currentPath = location.pathname;

    if (timetableId && !whitelist.includes(currentPath)) {
      navigate(`/timetables/${timetableId}`);
    }
  }, [location, navigate]);

  return (
    <div className="main">
      <ToastContainer />
      <MainLayout>
        <Routes>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/timetables/:timetableId" element={<Timetable />} />
          <Route path="/timetables/add" element={<AddTimetable />} />
          <Route
            path="/timetables/update/:timetableId"
            element={<UpdateTimetable />}
          />
          <Route path="timetables/find" element={<Find />} />
          <Route path="/about" element={<About />} />
          <Route
            path="timetables/sessions/:timetableId"
            element={<ManageSessions />}
          />
        </Routes>
      </MainLayout>
      <div className="gradient" />
    </div>
  );
};

export default App;
