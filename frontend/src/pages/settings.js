import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import "../styles/settings.css";

function Settings() {

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      const defaultUser = {
        name: "Demo User",
        email: "demo@crm.com",
        password: "1234",
        profile: ""
      };
      localStorage.setItem("user", JSON.stringify(defaultUser));
      setUser(defaultUser);
    } else {
      setUser(storedUser);
    }
  }, []);

  // SAVE PROFILE
  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated ✅");
  };

  // CHANGE PASSWORD
  const handlePassword = () => {
    if (!newPassword) {
      alert("Enter new password");
      return;
    }

    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    alert("Password updated 🔐");
    setNewPassword("");
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // DELETE DATA
  const handleDelete = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="dashboard-container">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        {/* ✅ CENTER CONTAINER */}
        <div className="settings-container">

          <h2 className="settings-title">Settings</h2>
          <p className="settings-subtitle">
            Manage your account settings and preferences
          </p>

          {/* TABS */}
          <div className="tabs">
            <button onClick={() => setActiveTab("profile")}>Profile</button>
            <button onClick={() => setActiveTab("notifications")}>Notifications</button>
            <button onClick={() => setActiveTab("account")}>Account</button>
          </div>

          {/* ================= PROFILE ================= */}
          {activeTab === "profile" && (
            <div className="card">

              <h3>Profile Information</h3>

              <div className="profile-row">

                <div className="avatar">
                  {user.profile ? (
                    <img src={user.profile} alt="profile" />
                  ) : (
                    <div className="avatar-placeholder">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="profile-fields">

                  <div className="form-group">
                    <label>Name</label>
                    <input
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input value={user.email} readOnly />
                  </div>

                </div>

              </div>

              <button className="primary-btn" onClick={handleSave}>
                Save Changes
              </button>

            </div>
          )}

          {/* ================= NOTIFICATIONS ================= */}
          {activeTab === "notifications" && (
            <div className="card">

              <h3>Notifications</h3>

              <div className="toggle">
                <span>Email Notifications</span>
                <input type="checkbox" defaultChecked />
              </div>

              <div className="toggle">
                <span>Browser Alerts</span>
                <input type="checkbox" />
              </div>

            </div>
          )}

          {/* ================= ACCOUNT ================= */}
          {activeTab === "account" && (
            <div className="card">

              <h3>Account Settings</h3>

              {/* USER INFO */}
              <div className="info-box">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>

              {/* PASSWORD */}
              <div className="form-group">
                <label>Change Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button className="primary-btn" onClick={handlePassword}>
                  Update Password
                </button>
              </div>

              <hr />

              {/* ACTIONS */}
              <div className="actions">

                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>

                <button className="delete-btn" onClick={handleDelete}>
                  Delete All Data
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Settings;