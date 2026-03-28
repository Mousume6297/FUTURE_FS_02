const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login",(req,res)=>{

const {email,password} = req.body;

const sql = "SELECT * FROM users WHERE email=? AND password=?";

db.query(sql,[email,password],(err,result)=>{

if(err){
return res.status(500).send("Server error");
}

if(result.length > 0){
res.json({
success:true,
user:result[0]
});
}
else{
res.json({
success:false,
message:"Invalid credentials"
});
}

});

});

router.post("/createUser",(req,res)=>{

const {name,email,password,role} = req.body;

const sql = "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)";

db.query(sql,[name,email,password,role],(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({success:false});
}

res.json({
success:true,
message:"User created"
});

});

});

module.exports = router;