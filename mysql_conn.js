const mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  user: "fam",
  password: "deliveryPass",
  database: "fam_delivery"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

module.exports = con;