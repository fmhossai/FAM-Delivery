const express = require("express");
const path = require('path');
const app = express();
const productRoutes = require("./routes/product")
const axios = require('axios');

app.set('view engine', 'ejs'); 
app.use(express.json())
app.use(express.static(__dirname + '/public'));
app.set('views', path.resolve(__dirname, 'views'));
app.set('port', process.env.PORT || process.argv[2] || 3001);
app.use('/api/products', productRoutes);
app.get('/checkout', (req, res) => {
    res.render('checkout');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/category/:name', (req, res) => {
    res.render('category', {});
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/', async(req, res) => {
    const resp = await axios.get("http://localhost:3001/api/products")
    let foundProducts = resp.data;
    res.render('index', {
        products: foundProducts
    });
});

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
});

