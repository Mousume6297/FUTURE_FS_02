const express = require("express");
const router = express.Router();
const db = require("../db");

// Add Lead
router.post("/addLead", (req, res) => {
  const { name, email, source } = req.body;

  const sql = "INSERT INTO leads (name,email,source) VALUES (?,?,?)";

  db.query(sql, [name, email, source], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error adding lead");
    } else {
      res.send("Lead added successfully");
    }
  });
});

// Get All Leads
router.get("/leads", (req, res) => {
  const sql = "SELECT * FROM leads";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching leads");
    } else {
      res.json(result);
    }
  });
});

// Update Lead Status
router.put("/updateStatus/:id", (req, res) => {

const { status } = req.body;
const { id } = req.params;

const sql = "UPDATE leads SET status = ? WHERE id = ?";

db.query(sql, [status, id], (err, result) => {

if (err) {
console.log(err);
res.status(500).send("Error updating status");
} else {
res.send("Lead status updated");
}

});

});

// Add Notes
router.put("/addNote/:id", (req, res) => {

const { notes } = req.body;
const { id } = req.params;

const sql = "UPDATE leads SET notes = ? WHERE id = ?";

db.query(sql, [notes, id], (err, result) => {

if (err) {
console.log(err);
res.status(500).send("Error adding note");
} else {
res.send("Note added successfully");
}

});

});

// Delete Lead
router.delete("/deleteLead/:id", (req, res) => {

const { id } = req.params;

const sql = "DELETE FROM leads WHERE id = ?";

db.query(sql, [id], (err, result) => {

if (err) {
console.log(err);
res.status(500).send("Error deleting lead");
} else {
res.send("Lead deleted successfully");
}

});

});

module.exports = router;