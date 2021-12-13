const mysql = require("mysql");

let conn = mysql.createConnection({
  host: "localhost",
  user: "fam",
  password: "deliveryPass",
  database: "fam_delivery",
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

module.exports = conn;