import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // ❌ remove user data
    localStorage.removeItem("crmUser");

    // optional: clear profile also
    localStorage.removeItem("profile");

    // ✅ redirect to login
    navigate("/login");
  };

  return (
    <div className="navbar">

      {/* LEFT */}
      <div className="navbar-left">
        <div className="brand">
          <FaChartLine className="brand-icon" />
          <div className="brand-text">
            <span className="brand-name">ClientHub</span>
            <span className="brand-sub">CRM</span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Navbar;