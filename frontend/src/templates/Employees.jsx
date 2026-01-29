import React, { useState } from "react";
import axiosInstance from "../api/axios";
import { Link } from "react-router-dom";
import "./Employees.css";

export default function Employees() {
  const [formData, setFormData] = useState({
    Employee_id: "",
    Full_Name: "",
    Email_Address: "",
    Department: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("emp/", formData);

      alert("Employee added successfully ✅");
      console.log(response.data);

      // reset form
      setFormData({
        Employee_id: "",
        Full_Name: "",
        Email_Address: "",
        Department: "",
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.Employee_id?.[0] ||
        error.response?.data?.Email_Address?.[0] ||
        error.message ||
        "Error adding employee";
      alert(`Error: ${errorMessage} ❌`);
    }
  };

  return (
    <div className="container">
      <div className="title">
        <p>Employee Registration</p>
      </div>
      
      <div className="nav-links">
        <Link to="/employees" className="nav-link">👥 View Employees</Link>
        <Link to="/attendance" className="nav-link">📅 Mark Attendance</Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="user_details">
          <div className="input_box">
            <label>Emp ID</label>
            <input
              type="text"
              name="Employee_id"
              value={formData.Employee_id}
              onChange={handleChange}
              placeholder="Enter emp id"
              required
            />
          </div>

          <div className="input_box">
            <label>Full Name</label>
            <input
              type="text"
              name="Full_Name"
              value={formData.Full_Name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="input_box">
            <label>Email</label>
            <input
              type="email"
              name="Email_Address"
              value={formData.Email_Address}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input_box">
            <label>Department</label>
            <input
              type="text"
              name="Department"
              value={formData.Department}
              onChange={handleChange}
              placeholder="Enter your department"
              required
            />
          </div>
        </div>

        <div className="reg_btn">
          <input type="submit" value="Register" />
        </div>
      </form>
    </div>
  );
}
