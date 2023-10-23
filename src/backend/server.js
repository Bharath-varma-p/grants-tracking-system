const express = require('express');
const mysql = require('mysql2');
const path = require('path')
const moment = require('moment');

const app = express();
//Mysql connection details
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Parvathi@12345',
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

app.get('/dashboard', (req, res) => {
  const data = [];
  res.render('dashboard', { data }); // Render the dashboard with no results initially
});


// // Define a route to retrieve all grants
// app.get('/grants', async (req, res) => {
//   const grants = await (await connection).query('SELECT id FROM grants');
//   // console.log(grants)
//   res.json(grants);
// });

app.post('/dashboard', (req,res) => {
    const keySearch = req.body.keyword;
   // select * from loginsystem.grants_tracks where title like '%Media%';
    const sql = 'SELECT * from grants_trackings where title like ?';

    connection.query(sql, [`%${keySearch}%`], (err,results) => {
        if(err){
          res.send("Error executing SQL query: ' + error.stack");
        }else{
          console.log("results",results.length);
       //   res.json(results);
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

app.get('/login', (req, res) => {
  res.render('login'); // Render the login page
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});