const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "W7301@jqir#",
  database: "mini_crm"
});

// routes
const leadRoutes = require("./routes/leads");
const authRoutes = require("./routes/auth");

app.use("/api", leadRoutes);
app.use("/api/auth", authRoutes);


// ================== STAFF APIs ==================

// ✅ CREATE (admin + Manager + HR only)
app.post("/api/staff/create", (req, res) => {
  const { name, email, password, role, currentUserRole } = req.body;

  if (!["admin", "Manager", "HR"].includes(currentUserRole)) {
    return res.json({
      success: false,
      message: "Access denied (create not allowed)"
    });
  }

  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, password, role], (err) => {
    if (err) {
      console.log("CREATE ERROR:", err);
      return res.json({ success: false, message: "Database error" });
    }

    res.json({ success: true, message: "Staff created" });
  });
});


// ✅ GET (everyone including demo)
app.get("/api/staff", (req, res) => {
  const sql = "SELECT id, name, email, role FROM users";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("FETCH ERROR:", err);
      return res.json({ success: false, message: "Fetch failed" });
    }

    res.json({ success: true, data: result });
  });
});


// ✅ DELETE (ONLY ADMIN)
app.delete("/api/staff/:id", (req, res) => {
  const id = req.params.id;
  const { currentUserRole } = req.body;

  if (currentUserRole !== "admin") {
    return res.json({
      success: false,
      message: "Only admin can delete"
    });
  }

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.log("DELETE ERROR:", err);
      return res.json({ success: false, message: "Delete failed" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  });
});


// ✅ UPDATE (admin + Manager + HR only)
app.put("/api/staff/update/:id", (req, res) => {
  const id = req.params.id;
  const { name, email, role, currentUserRole } = req.body;

  if (!["admin", "Manager", "HR"].includes(currentUserRole)) {
    return res.json({
      success: false,
      message: "Access denied (update not allowed)"
    });
  }

  const sql = "UPDATE users SET name=?, email=?, role=? WHERE id=?";

  db.query(sql, [name, email, role, id], (err) => {
    if (err) {
      console.log("UPDATE ERROR:", err);
      return res.json({ success: false, message: "Update failed" });
    }

    res.json({ success: true, message: "Updated successfully" });
  });
});


// ================== PASSWORD ==================

app.post("/api/auth/change-password", (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  const checkSql = "SELECT * FROM users WHERE email = ?";

  db.query(checkSql, [email], (err, result) => {
    if (err) {
      console.log("CHECK ERROR:", err);
      return res.json({ success: false });
    }

    if (result.length === 0) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const user = result[0];

    if (user.password !== oldPassword) {
      return res.json({
        success: false,
        message: "Wrong old password"
      });
    }

    const updateSql = "UPDATE users SET password=? WHERE email=?";

    db.query(updateSql, [newPassword, email], (err2) => {
      if (err2) {
        console.log("PASSWORD ERROR:", err2);
        return res.json({ success: false });
      }

      res.json({ success: true, message: "Password updated" });
    });
  });
});


// ================== SERVER ==================

app.get("/", (req, res) => {
  res.send("CRM Server Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});