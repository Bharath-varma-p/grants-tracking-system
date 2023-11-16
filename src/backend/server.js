const express = require('express');
const mysql = require('mysql2');
const path = require('path')
const moment = require('moment');
require('dotenv').config();

const password = process.env.dbPassword;


const app = express();
//Mysql connection details
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'loginsystem'
});

const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'))

app.engine('.hbs', exphbs.engine({  defaultLayout: false, layoutsDir: './src/frontend/views/layouts', extname: '.hbs' }));
app.set('views', path.join(__dirname, '../frontend/views'));
app.set('view engine', '.hbs');

handlebars.registerHelper('formatDate', function(date) {
  return moment(date).format('MM/DD/YYYY');
})

handlebars.registerHelper('CFDAStringSlice', function(CFDA) {
  return CFDA.split(',')[0];
})

app.get('/dashboard', (req, res) => {
 // const data = [];
  const sql = 'SELECT * from grants_trackings';
  connection.query(sql, (err,results) => {
    console.log("results in render",results.length);
    res.render('dashboard', { data:results });
  })
  //res.render('dashboard', { data }); // Render the dashboard with no results initially
});



app.get('/dashboard-view-details', (req, res) => {
    const id = req.query.id; 
    const sql = 'SELECT * from grants_trackings WHERE id = ?';

    connection.query(sql,[id],(err,results) => {
      res.render('dashboard-view-details', { data: results });
    })

  });


app.post('/dashboard', (req,res) => {
    const keySearch = req.body.keyword;

    const sql = 'SELECT * from grants_trackings where title like ?';

    connection.query(sql, [`%${keySearch}%`], (err,results) => {
        if(err){
          res.send("Error executing SQL query: ' + error.stack");
        }else{
          console.log("results",results.length);
          res.render('dashboard',{ data: results });
        }
    });
});

app.post('/login', async (req,res) => {
  const {username,password} = req.body;

  const sql = 'SELECT * from users where username = ? and password = ?';

  connection.query(sql, [username,password], (err,results) => {
      if(err){
          console.log("Database error",err)
          res.send("Login failed")
      }else{
          if(results.length>=1){
              res.redirect('/dashboard');
          }else{
              res.send("Username and Password combination is incorrect");
          }
      }
  });
})

app.post('/register', async(req,res) => {
  const {username,password} = req.body;
  const sql = 'INSERT into users (username, password) values (?,?)';

  connection.query(sql, [username, password], (err,results) => {
    if(err){
      console.log("Database error",err);
    }else{
      res.redirect('/login');
    }
  });

})

app.get('/login', (req, res) => {
  res.render('login'); // Render the login page
});

app.get('/register', (req, res) => {
  res.render('signup'); // Render the signup page
});


// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});