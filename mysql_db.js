const mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  user: "fam",
  password: "deliveryPass"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});