import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";
import "./EmployeeList.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchEmployees = () => {
    setLoading(true);
    setError(null);
    axiosInstance
      .get("emp/")
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load employees. Please try again.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    setDeletingId(id);
    try {
      await axiosInstance.delete(`emp/${id}/`);
      alert("Employee deleted successfully ✅");
      fetchEmployees(); // Refresh the list
    } catch (err) {
      console.error(err);
      alert("Error deleting employee ❌");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container">
      <div className="title">
        <p>Employee List</p>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">➕ Add Employee</Link>
        <Link to="/attendance" className="nav-link">📅 Mark Attendance</Link>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading employees...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <p>❌ {error}</p>
          <button onClick={fetchEmployees} className="retry-btn">Retry</button>
        </div>
      ) : (
        <>
          {employees.length === 0 ? (
            <div className="empty-state">
              <p>📭 No employees found</p>
              <Link to="/" className="nav-link">Add your first employee</Link>
            </div>
          ) : (
            <div className="table-container">
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>Emp ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.Employee_id}</td>
                      <td>{emp.Full_Name}</td>
                      <td>{emp.Email_Address}</td>
                      <td>{emp.Department}</td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            to={`/attendance/${emp.Employee_id}`}
                            className="view-btn"
                          >
                            View Attendance
                          </Link>
                          <button
                            onClick={() => handleDelete(emp.id)}
                            disabled={deletingId === emp.id}
                            className="delete-btn"
                          >
                            {deletingId === emp.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
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
