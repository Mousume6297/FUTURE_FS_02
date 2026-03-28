const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "W7301@jqir#",
    database: "mini_crm"
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
    } else {
        console.log("MySQL Connected");
    }
});

module.exports = db;