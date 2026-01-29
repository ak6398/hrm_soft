import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";
import "./Attendance.css";

export default function Attendance() {
  const [formData, setFormData] = useState({
    employee: "",
    date: new Date().toISOString().split("T")[0],
    status: "P",
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("emp/");
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Find employee ID from Employee_id
      const selectedEmployee = employees.find(
        (emp) => emp.Employee_id === formData.employee
      );

      if (!selectedEmployee) {
        throw new Error("Please select a valid employee");
      }

      const attendanceData = {
        employee: selectedEmployee.id,
        date: formData.date,
        status: formData.status,
      };

      await axiosInstance.post("att/", attendanceData);
      setSuccess(true);
      setFormData({
        employee: "",
        date: new Date().toISOString().split("T")[0],
        status: "P",
      });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.non_field_errors?.[0] ||
        err.message ||
        "Error marking attendance";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="title">
        <p>Mark Attendance</p>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">➕ Add Employee</Link>
        <Link to="/employees" className="nav-link">👥 View Employees</Link>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading employees...</p>
        </div>
      ) : employees.length === 0 ? (
        <div className="empty-state">
          <p>📭 No employees found</p>
          <Link to="/" className="nav-link">Add employees first</Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="attendance-form">
          <div className="form-group">
            <label htmlFor="employee">
              Employee <span className="required">*</span>
            </label>
            <select
              id="employee"
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Select an employee</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.Employee_id}>
                  {emp.Employee_id} - {emp.Full_Name} ({emp.Department})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">
              Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="form-input"
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">
              Status <span className="required">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="P">Present</option>
              <option value="A">Absent</option>
            </select>
          </div>

          {error && (
            <div className="error-message">
              <span>❌</span> {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              <span>✅</span> Attendance marked successfully!
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              disabled={submitting}
              className="submit-btn"
            >
              {submitting ? "Marking..." : "Mark Attendance"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
