const express = require('express');
const path = require('path');
const app = express();
const apiRoutes = require("./routes/api");
const axios = require('axios');
// const mysql_conn = require('./mysql_conn');
// const mysql_queries = require('./mysql_queries');

app.set('port', process.env.PORT || process.argv[2] || 3000);
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/api/', apiRoutes);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs'); 


app.get('/category', (req, res) => {
    res.render('category');
});

app.get('/checkout', (req, res) => {
    res.render('checkout');
});


app.get('/', async(req, res) => {
    const resp = await axios.get("http://localhost:3000/api/products")
    const foundProducts = resp.data;
    let sendToIndex = {
        "Top Picks" : [],
        "Healthy" : []
    }
    for(let i =0; i <4; i++){
        sendToIndex["Top Picks"].push(foundProducts[i]);
    }
    let j = 0;
    for(let i =0; i <foundProducts.length; i++){
        if(j == 4){
            break;
        }
        if(foundProducts[i].product_category == "Veggies"){
            sendToIndex["Healthy"].push(foundProducts[i]);
            j++;
        }
    }
    res.render('index', {
        products: sendToIndex
    });
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