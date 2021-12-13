require('dotenv').config()

const express = require('express');
const path = require('path');
const axios = require('axios');
const session = require('express-session');
const flash = require('express-flash');

const app = express();
const apiRoutes = require("./routes/api");

const mysql_conn = require('./mysql_conn');
// const mysql_queries = require('./mysql_queries');


app.use(session({
    secret: 'hi',
    resave: false,
    //store: databasename
    saveUninitialized: false,
    cookie: { maxPage: 1000 * 60 * 60 * 24 }
}));
app.use(flash());


app.set('port', process.env.PORT || process.argv[2] || 3000);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs'); 

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/api/', apiRoutes);


require('./routes/routes')(app, axios)

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
});


