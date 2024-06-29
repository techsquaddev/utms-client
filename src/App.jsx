import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, FindTimetable } from "./components";
import { Home, Timetable, AddTimetableStepper } from "./pages";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/addtimetable" element={<AddTimetableStepper />} />
          <Route path="/find" element={<FindTimetable />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
