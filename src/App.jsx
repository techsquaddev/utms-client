import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Footer, Navbar } from "./components";
import {
  Home,
  AddTimetable,
  UpdateTimetable,
  ManageSessions,
  Dashboard,
  Timetable,
  Find,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timetableId = localStorage.getItem("timetableId");
    if (timetableId) {
      navigate(`/timetables/${timetableId}`);
    }
  }, [navigate]);

  return (
    <div className="app">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/timetables/:timetableId" element={<Timetable />} />
        <Route path="/timetables/add" element={<AddTimetable />} />
        <Route
          path="/timetables/update/:timetableId"
          element={<UpdateTimetable />}
        />
        <Route path="timetables/find" element={<Find />} />
        <Route
          path="timetables/sessions/:timetableId"
          element={<ManageSessions />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
