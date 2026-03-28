import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import { FaUserPlus } from "react-icons/fa";

function AddLead(){

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [source,setSource] = useState("");
  const [status,setStatus] = useState("New");

  // ✅ USER CHECK (ONLY ONCE)
  const currentUser = JSON.parse(localStorage.getItem("crmUser")) || {};
  const isViewer = currentUser.role?.toLowerCase() === "viewer";

  const handleSubmit = (e)=>{
    e.preventDefault();

    if (isViewer) {
      alert("You have view-only access and cannot add leads.");
      return;
    }

    const newLead = {
      id: Date.now(),
      name,
      email,
      source,
      status,
      date: new Date().toISOString() // ✅ important for charts
    };

    const existingLeads = JSON.parse(localStorage.getItem("leads")) || [];
    existingLeads.push(newLead);

    localStorage.setItem("leads", JSON.stringify(existingLeads));

    alert("Lead Added Successfully");

    setName("");
    setEmail("");
    setSource("");
    setStatus("New");

    navigate("/leads");
  };

  return(

    <div className="dashboard-container">

      <Sidebar/>

      <div className="main-content">

        <Navbar/>

        <div className="form-page">

          {/* HEADER */}
          <div className="form-header">
            <h2>
              <FaUserPlus/> Add New Lead
            </h2>
            <p>Create and manage your client leads easily</p>
          </div>

          {/* FORM CARD */}
          <div className="form-card">

            <form className="lead-form" onSubmit={handleSubmit}>

              {/* ROW 1 */}
              <div className="form-row">

                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter client name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                  />
                </div>

              </div>

              {/* ROW 2 */}
              <div className="form-row">

                <div className="form-group">
                  <label>Source</label>
                  <select
                    value={source}
                    onChange={(e)=>setSource(e.target.value)}
                    required
                  >
                    <option value="">Select Source</option>
                    <option value="Website">Website</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Referral">Referral</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={status}
                    onChange={(e)=>setStatus(e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Converted">Converted</option>
                  </select>
                </div>

              </div>

              {/* BUTTON */}
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={isViewer}
                >
                  {isViewer ? "View Only Access" : "Add Lead"}
                </button>
              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AddLead;