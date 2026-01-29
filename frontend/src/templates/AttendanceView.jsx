import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import "./AttendanceView.css";

export default function AttendanceView() {
  const { employeeId } = useParams();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttendance();
    fetchEmployee();
  }, [employeeId]);

  const fetchEmployee = async () => {
    try {
      const response = await axiosInstance.get("emp/");
      const foundEmployee = response.data.find(
        (emp) => emp.Employee_id === employeeId
      );
      setEmployee(foundEmployee);
    } catch (err) {
      console.error("Error fetching employee:", err);
    }
  };

  const fetchAttendance = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`att/employee/${employeeId}/`);
      setAttendanceRecords(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load attendance records");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === "P") {
      return <span className="status-badge present">Present</span>;
    }
    return <span className="status-badge absent">Absent</span>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const presentDays = attendanceRecords.filter(
    (record) => record.status === "P"
  ).length;
  const totalDays = attendanceRecords.length;

  return (
    <div className="container">
      <div className="title">
        <p>
          Attendance Records
          {employee && ` - ${employee.Full_Name}`}
        </p>
      </div>

      <div className="nav-links">
        <Link to="/employees" className="nav-link">👥 Back to Employees</Link>
        <Link to="/attendance" className="nav-link">📅 Mark Attendance</Link>
      </div>

      {employee && (
        <div className="employee-info">
          <div className="info-item">
            <strong>Employee ID:</strong> {employee.Employee_id}
          </div>
          <div className="info-item">
            <strong>Name:</strong> {employee.Full_Name}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {employee.Email_Address}
          </div>
          <div className="info-item">
            <strong>Department:</strong> {employee.Department}
          </div>
        </div>
      )}

      {totalDays > 0 && (
        <div className="summary-card">
          <div className="summary-item">
            <span className="summary-label">Total Days:</span>
            <span className="summary-value">{totalDays}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Present Days:</span>
            <span className="summary-value present">{presentDays}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Absent Days:</span>
            <span className="summary-value absent">
              {totalDays - presentDays}
            </span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading attendance records...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>❌ {error}</p>
          <button onClick={fetchAttendance} className="retry-btn">
            Retry
          </button>
        </div>
      ) : (
        <>
          {attendanceRecords.length === 0 ? (
            <div className="empty-state">
              <p>📭 No attendance records found</p>
              <Link to="/attendance" className="nav-link">
                Mark attendance for this employee
              </Link>
            </div>
          ) : (
            <div className="table-container">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceRecords.map((record) => (
                    <tr key={record.id}>
                      <td>{formatDate(record.date)}</td>
                      <td>{getStatusBadge(record.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
