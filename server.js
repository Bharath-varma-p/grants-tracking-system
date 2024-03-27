const express = require('express');
const mysql = require('mysql2');
const path = require('path')
const moment = require('moment');
const session = require('express-session');
const routes = require('./routes')
require('dotenv').config();

//registarting the templates
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials');

const app = express();
//Mysql connection details
const connection = require('./database');

const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const { ro } = require('date-fns/locale');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'))



app.engine('.hbs', exphbs.engine({ 
  extname: '.hbs',
  partialsDir: path.join(__dirname,'/views/partials')
 }));
// app.set('views', path.join(__dirname, '../frontend/views'));
app.set('view engine', '.hbs');

handlebars.registerHelper('formatDate', function(date) {
  return moment(date).format('MM/DD/YYYY');
})

handlebars.registerHelper('CFDAStringSlice', function(CFDA) {
  return CFDA.split(',')[0];
})

app.use("/",routes);

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});