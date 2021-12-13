const express = require('express');
const path = require('path');
const app = express();
const apiRoutes = require("./routes/api");
const axios = require('axios');
const mysql_conn = require('./mysql_conn');
const mysql_queries = require('./mysql_queries');

app.set('port', process.env.PORT || process.argv[2] || 3000);
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/api/', apiRoutes);
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs'); 

require('./routes/routes')(app, axios)

app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`)
});


