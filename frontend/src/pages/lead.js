import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";

function Leads(){

const [editingLead,setEditingLead] = useState(null);
const [editName,setEditName] = useState("");
const [editEmail,setEditEmail] = useState("");
const [editSource,setEditSource] = useState("");
const [leads,setLeads] = useState([]);
const [search,setSearch] = useState("");

useEffect(()=>{
const storedLeads = JSON.parse(localStorage.getItem("leads")) || [];
setLeads(storedLeads);
},[]);

// ===== EDIT =====
const startEdit = (lead)=>{
setEditingLead(lead.id);
setEditName(lead.name);
setEditEmail(lead.email);
setEditSource(lead.source);
};

const saveEdit = ()=>{
const updatedLeads = leads.map((lead)=>{
if(lead.id === editingLead){
return {
...lead,
name:editName,
email:editEmail,
source:editSource
};
}
return lead;
});
setLeads(updatedLeads);
localStorage.setItem("leads",JSON.stringify(updatedLeads));
setEditingLead(null);
};

// ===== DELETE =====
const deleteLead = (id) => {
const updatedLeads = leads.filter((lead)=> lead.id !== id);
setLeads(updatedLeads);
localStorage.setItem("leads", JSON.stringify(updatedLeads));
};

// ===== STATUS =====
const updateStatus = (id,newStatus)=>{
const updatedLeads = leads.map((lead)=>{
if(lead.id === id){
return {...lead,status:newStatus};
}
return lead;
});
setLeads(updatedLeads);
localStorage.setItem("leads",JSON.stringify(updatedLeads));
};

return(

<div className="dashboard-container">

<Sidebar/>

<div className="main-content">

<Navbar/>

{/* ===== HEADER ===== */}
<div className="leads-header">
  <h2 className="page-title">Leads</h2>

  <input
    type="text"
    placeholder="Search leads..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    className="search-box"
  />
</div>

{/* ===== TABLE CARD ===== */}
<div className="leads-container">

<table className="leads-table">

<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Source</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{leads
.filter((lead)=>
lead.name.toLowerCase().includes(search.toLowerCase()) ||
lead.email.toLowerCase().includes(search.toLowerCase()) ||
lead.source.toLowerCase().includes(search.toLowerCase())
)
.map((lead)=>(

<tr key={lead.id}>

<td>
{editingLead === lead.id ? (
<input value={editName} onChange={(e)=>setEditName(e.target.value)} />
) : (
lead.name
)}
</td>

<td>
{editingLead === lead.id ? (
<input value={editEmail} onChange={(e)=>setEditEmail(e.target.value)} />
) : (
lead.email
)}
</td>

<td>
{editingLead === lead.id ? (
<input value={editSource} onChange={(e)=>setEditSource(e.target.value)} />
) : (
lead.source
)}
</td>

<td>
{/* ✅ STATUS BADGE + DROPDOWN */}
<div className="status-wrapper">

<span className={`status-badge ${lead.status.toLowerCase()}`}>
  {lead.status}
</span>

<select
value={lead.status}
onChange={(e)=>updateStatus(lead.id,e.target.value)}
className="status-select"
>
<option value="New">New</option>
<option value="Contacted">Contacted</option>
<option value="Converted">Converted</option>
</select>

</div>
</td>

<td>

{editingLead === lead.id ? (

<button className="save-btn" onClick={saveEdit}>
Save
</button>

) : (

<>

<button
className="edit-btn"
onClick={()=>startEdit(lead)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteLead(lead.id)}
>
Delete
</button>

</>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</div>

);

}

export default Leads;