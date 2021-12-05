const express = require('express');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || process.argv[2] || 3000);
app.use(express.static(__dirname + '/public'));

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs'); 


app.get('/category', (req, res) => {
    res.render('category');
});

app.get('/checkout', (req, res) => {
    res.render('checkout');
});


app.get('/', (req, res) => {
    res.render('index');
});



app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
});


/*
const express = require("express");

const app = express();

app.set('view engine', 'ejs'); 


app.set('port', process.env.PORT || process.argv[2] || 3001);

app.get('/checkout', (req, res) => {
    res.render('checkout');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/category', (req, res) => {
    res.render('category');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/', (req, res) => {
    res.render('index');
});


*/