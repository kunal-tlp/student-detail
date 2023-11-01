const mysql = require("mysql")
// require("dotenv").config({ path: "./env" })

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "student-details",
    charset: "utf8mb4"
});

connection.connect(function (err, res) {
    if (err) {
        console.log("Database error", err)
    } else {
        console.log("Db Connected Successfull")
    }
});

module.exports = connection;
