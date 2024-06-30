import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, FindTimetable, AddTimetable } from "./components";
import { Home, Timetable } from "./pages";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timetable/:id" element={<Timetable />} />
          <Route path="/addtimetable" element={<AddTimetable />} />
          <Route path="/find" element={<FindTimetable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
