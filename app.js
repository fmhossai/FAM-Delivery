const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("./mysql_db");
const routes = require("./routes");
const app = express();

let server = {
    port: 3001
};

app.set("port", process.env.PORT || server.port);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({"message": "ok"});
})

app.listen(app.get("port"), function() {
    console.log("Server started on port " + app.get("port"));
});