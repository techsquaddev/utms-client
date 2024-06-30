import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, FindTimetable } from "./components";
import { Home, Timetable, AddTimetable, UpdateTimetable } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timetable/:id" element={<Timetable />} />
          <Route path="/addtimetable" element={<AddTimetable />} />
          <Route
            path="/updatetimetable/:timetableId"
            element={<UpdateTimetable />}
          />
          <Route path="/find" element={<FindTimetable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
