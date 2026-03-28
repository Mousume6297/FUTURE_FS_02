import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaPlus, FaUserPlus } from "react-icons/fa";

function Sidebar() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("crmUser"));
    const storedProfile = JSON.parse(localStorage.getItem("profile"));

    setUser(storedUser);
    setProfile(storedProfile || {});
  }, []);

  if (!user) {
    return <div className="sidebar">Loading...</div>;
  }

  return (
    <div className="sidebar">

      {/* HEADER */}
      <div className="sidebar-header">
        <img src="/logo1.png" alt="logo" className="sidebar-logo" />
        <h2 className="logo-text">ClientHub</h2>
      </div>

      {/* NAV LINKS */}
      <nav className="nav-links">
        <NavLink to="/dashboard" className="nav-item">
          <FaHome className="icon" />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/leads" className="nav-item">
          <FaUsers className="icon" />
          <span>Leads</span>
        </NavLink>

        <NavLink to="/add-lead" className="nav-item">
          <FaPlus className="icon" />
          <span>Add Lead</span>
        </NavLink>

        <NavLink to="/create-staff" className="nav-item">
          <FaUserPlus className="icon" />
          <span>Create Staff</span>
        </NavLink>
      </nav>

      {/* PROFILE */}
      <div
        className="sidebar-profile"
        onClick={() => navigate("/profile")}
      >
        <div className="profile-box">

          <div className="avatar">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt="user"
                className="sidebar-avatar-img"
              />
            ) : (
              user.name?.charAt(0)
            )}
          </div>

          <div className="profile-text">
            <p className="profile-name">{user.name}</p>
            <p className="profile-email">{user.email}</p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Sidebar;