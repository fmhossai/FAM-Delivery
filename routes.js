var express = require("express");
var router = express.Router();

// index page
router.get("/", function(req, res) {
    console.log("Accessed index page.");
    res.render("index");
});

// login page
router.get("/login", function(req, res) {
    console.log("Accessed login page.");
    res.render("login");
});

// signup page
router.get("/signup", function(req, res) {
    console.log("Accessed signup page.");
    res.render("signup");
});

// about page
router.get("/about", function(req, res) {
    console.log("Accessed about page.");
    res.render("about");
});

module.exports = router;