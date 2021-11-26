const express = require("express");
const path = require('path');
const app = express();

app.set('view engine', 'ejs'); 
app.use(express.static(__dirname + '/public'));
app.set('views', path.resolve(__dirname, 'views'));
app.set('port', process.env.PORT || process.argv[2] || 3001);

app.get('/cat', (req, res) => {
    res.render('category');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
});