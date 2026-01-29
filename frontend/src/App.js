import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Employees from './templates/Employees';
import EmployeeList from "./templates/EmployeeList";
import Attendance from "./templates/Attendance";
import AttendanceView from "./templates/AttendanceView";


function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Employees />} />
      <Route path="/employees" element={<EmployeeList />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/attendance/:employeeId" element={<AttendanceView />} />
    </Routes>
   </Router>
  );
}

export default App;
