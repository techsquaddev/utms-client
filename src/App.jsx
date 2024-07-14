import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, FindTimetable } from './components';
import {
  Home,
  AddTimetable,
  UpdateTimetable,
  ManageSessions,
  Timetable,
} from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/timetables/:timetableId" element={<Timetable />} />
          <Route path="/timetables/add" element={<AddTimetable />} />
          <Route
            path="/timetables/update/:timetableId"
            element={<UpdateTimetable />}
          />
          <Route path="timetables/find" element={<FindTimetable />} />
          <Route
            path="timetables/sessions/:timetableId"
            element={<ManageSessions />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
