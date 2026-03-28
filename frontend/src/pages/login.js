import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaUsers, FaUser, FaChartLine, FaChartBar} from "react-icons/fa";
import "../styles/login.css";
import logo from "../assets/logo.png";

function Login() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [showPassword,setShowPassword] = useState(false);
const [loading,setLoading] = useState(false);
const [error,setError] = useState("");

// LOGIN FUNCTION
const loginUser = async (e)=>{
e.preventDefault();

setLoading(true);
setError("");

// Demo login bypass backend
if(email === "demo@123" && password === "demo123"){

localStorage.setItem("crmUser", JSON.stringify({
  name: "Demo User",   // 🔥 ADD THIS
  email: "demo@123",
  role: "viewer",  // 🔥 demo is view-only
  password: "demo123"  // 🔥 optional but useful for password change
}));

window.location.href="/dashboard";
return;

}

try{

const res = await axios.post(
"http://localhost:5000/api/auth/login",
{ email,password }
);

if(res.data.success){

localStorage.setItem("crmUser",JSON.stringify(res.data.user));
window.location.href="/dashboard";

}else{
setError("Invalid email or password");
}

}catch(err){
setError("Server error");
}

setLoading(false);
};
// DEMO CREDENTIALS (only fills input fields)
const demoLogin = ()=>{
setEmail("demo@123");
setPassword("demo123");
};

return(

<div className="login-container">

{/* LEFT SIDE LOGIN */}

<div className="login-left">

<img src={logo} alt="ClientHub Logo" className="logo"/>

<h2>ClientHub CRM</h2>

<p className="login-subtitle">
Secure login for authorized users
</p>

<form onSubmit={loginUser}>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<div className="password-field">

<input
type={showPassword ? "text":"password"}
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<span
className="eye-icon"
onClick={()=>setShowPassword(!showPassword)}
>
{showPassword ? <FaEyeSlash/> : <FaEye/>}
</span>

</div>

{error && <p className="error">{error}</p>}

<button className="login-btn">

{loading ? "Loading..." : "Login"}

</button>

</form>

<button
className="demo-btn"
onClick={demoLogin}
>
Use Demo Credentials
</button>

</div>

{/* RIGHT SIDE INFO */}

<div className="login-right">

<h1>ClientHub CRM</h1>
<p className="hero-tagline">Smart Customer Management Platform</p>

<p>
ClientHub CRM is a Customer Relationship Management system that helps
businesses manage customer information, staff activities, and leads
in one place.
</p>

<h3>Key Features</h3>

<ul className="feature-list">

<li>
<FaUser className="feature-icon" />
Manage customer details easily
</li>

<li>
<FaChartLine className="feature-icon" />
Track leads and opportunities
</li>

<li>
<FaUsers className="feature-icon" />
Add and manage staff members
</li>

<li>
<FaChartBar className="feature-icon" />
View dashboard insights
</li>

</ul>

</div>

</div>

);

}

export default Login;