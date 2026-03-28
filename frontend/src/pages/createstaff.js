import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { FaUserPlus } from "react-icons/fa";
import "../styles/createstaff.css";

function CreateStaff() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const [staffList, setStaffList] = useState([]);
  const [editStaff, setEditStaff] = useState(null);

  const user = JSON.parse(localStorage.getItem("crmUser")) || {};
  const profile = JSON.parse(localStorage.getItem("profile")) || {};

  const roleUser = user?.role;

  const canCreate = ["admin", "Manager", "HR"].includes(roleUser);
  const canEdit = ["admin", "Manager", "HR"].includes(roleUser);
  const canDelete = ["admin"].includes(roleUser);
  const isDemo = roleUser === "demo";

  // 🔥 FETCH STAFF
  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/staff");

      if (res.data.success) {
        setStaffList(res.data.data);
        localStorage.setItem("staff", JSON.stringify(res.data.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // 🔥 CREATE
  const handleSubmit = async () => {

    if (isDemo) {
      alert("Demo account: action not allowed");
      return;
    }

    if (!name || !email || !role || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/staff/create",
        {
          name,
          email,
          password,
          role,
          currentUserRole: roleUser
        }
      );

      if (res.data.success) {
        alert("Created Successfully");
        resetForm();
        fetchStaff();
      } else {
        alert(res.data.message);
      }

    } catch {
      alert("Create failed");
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id) => {

    if (isDemo) {
      alert("Demo account cannot delete");
      return;
    }

    if (!window.confirm("Delete this staff?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/staff/${id}`,
        { data: { currentUserRole: roleUser } }
      );

      if (res.data.success) {
        alert("Deleted");
        fetchStaff();
      } else {
        alert(res.data.message);
      }

    } catch {
      alert("Delete failed");
    }
  };

  // 🔥 EDIT
  const handleEditClick = (staff) => {

    if (isDemo) {
      alert("Demo account cannot edit");
      return;
    }

    setEditStaff(staff);
    setName(staff.name);
    setEmail(staff.email);
    setRole(staff.role);
  };

  // 🔥 UPDATE
  const handleUpdate = async () => {

    if (isDemo) {
      alert("Demo account cannot update");
      return;
    }

    if (!name || !email || !role) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/staff/update/${editStaff.id}`,
        {
          name,
          email,
          role,
          currentUserRole: roleUser
        }
      );

      if (res.data.success) {
        alert("Updated");
        setEditStaff(null);
        resetForm();
        fetchStaff();
      } else {
        alert(res.data.message);
      }

    } catch {
      alert("Update failed");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setRole("");
    setPassword("");
  };

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="staff-page">

          {/* ===== FORM ===== */}
          {canCreate ? (
            <div className="staff-form-card">

              <h2 className="staff-title">
                <FaUserPlus style={{ marginRight: "8px" }} />
                {editStaff ? "Update Staff" : "Create Staff"}
              </h2>

              <form className="staff-form">

                <div className="form-group">
                  <label>Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>

                {!editStaff && (
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}

                <button
                  type="button"
                  className="staff-btn"
                  onClick={editStaff ? handleUpdate : handleSubmit}
                >
                  {editStaff ? "Update Staff" : "Create Staff"}
                </button>

              </form>

            </div>
          ) : (
            <p style={{ color: "red" }}>
              {isDemo ? "Demo Mode: View Only" : "View Only Access"}
            </p>
          )}

          {/* ===== STAFF LIST ===== */}
          <div className="staff-list-card">

            <h2 className="staff-title">Staff List</h2>

            <table className="staff-table">

              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {staffList.map((staff) => (
                  <tr key={staff.id}>

                    {/* ✅ UPDATED AVATAR LOGIC */}
                    <td className="user-cell">

                      <div className="avatar">

                        {staff.email === user.email && profile.avatar ? (
                          <img
                            src={profile.avatar}
                            alt="user"
                            className="avatar-img"
                          />
                        ) : (
                          staff.name
                            ?.split(" ")
                            .map(n => n[0])
                            .join("")
                            .toUpperCase()
                        )}

                      </div>

                      {staff.name}
                    </td>

                    <td>{staff.email}</td>

                    <td>
                      <span className={`role-badge role-${staff.role.toLowerCase()}`}>
                        {staff.role}
                      </span>
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        disabled={!canEdit}
                        onClick={() => handleEditClick(staff)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        disabled={!canDelete}
                        onClick={() => handleDelete(staff.id)}
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CreateStaff;