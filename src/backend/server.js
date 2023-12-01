const express = require('express');
const mysql = require('mysql2');
const path = require('path')
const moment = require('moment');
const session = require('express-session');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
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

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

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

app.get('/logout', (req, res) => {
  // Destroy the user session
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Internal Server Error');
    } else {
      // Redirect to the login page or any other appropriate page
      res.redirect('/login'); 
    }
  });
});

app.get('/dashboard', (req, res) => {

 if (!req.session.email) {
  return res.redirect('/login'); // Redirect to login if not logged in
}

// Access the email from the session
  const userEmail = req.session.email;

  const sql = 'SELECT * from grants_trackings';
  connection.query(sql, (err,results) => {
    console.log("results in render",results.length);
    res.render('dashboard', { data:results,userEmail });
  })

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
          res.render('dashboard',{data: results});
        }
    });
});


// Enable TFA for a user
app.get('/enable-tfa', (req, res) => {

  if (!req.session.email) {
    return res.redirect('/login');
  }

  const email = req.session.email;

  const secretKey = speakeasy.generateSecret({length: 20});

  //  Generate QR code for the secret key
  // const qrCodeURL = QRCode.toDataURL(secretKey.otpauth_url);

  // Save the QR code image to a file (you may need to adjust the file path)
  const qrCodeImagePath = 'C:/Users/admin/Downloads/Grants-Portal/src/frontend/public/qr-code.png';
  QRCode.toFile(qrCodeImagePath, secretKey.otpauth_url);

  const qrCodeURL = 'C:/Users/admin/Downloads/Grants-Portal/src/frontend/public/qr-code.png';

  const sql = 'UPDATE users_2 SET is_tfa_enabled = 1, secret_key = ? WHERE email = ?';

  connection.query(sql, [secretKey.base32, email], (err) => {
    if (err) {
      console.error(err.name);
      res.status(500).send('Error enabling TFA');
      return;
    }
    res.render('enable-tfa', {qrCodeURL: qrCodeURL});
});
});

// TFA verification route
app.post('/verify-tfa', (req, res) => {
  const email = req.session.email;
  const token = req.body.token;

  // Retrieve secret key from database based on email
  connection.query('SELECT secret_key FROM users_2 WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error verifying token');
      return;
    }

    const secretKey = results[0].secret_key;

  // Verify token using speakeasy
  const verified = speakeasy.totp.verify({
    secret: secretKey,
    encoding: 'base32',
    token: token,
    window: 1
  });

  if (verified) {
    req.session.userEmail = email;
    res.redirect('/dashboard');
  } else {
    res.status(401).send({message: 'Invalid token'});
  }
});
});


app.post('/login', async (req,res) => {
  const {email,password} = req.body;
  
  if (!isValidEmail(email)) {
    return res.status(400).send('Invalid email format');
  }

  const sql = 'SELECT * from users_2 where email = ? and password = ?';

  connection.query(sql, [email,password], (err,results) => {
      if(err){
          console.log("Database error",err)
          res.send("Login failed")
      }else{
          if(results.length>=1){
              const user = results[0];
              const tfa_enabled = user.is_tfa_enabled;
              // console.log("tfa_enabled",tfa_enabled)

              req.session.email = req.body.email;
              res.redirect('/enable-tfa');
              // if (!user.is_tfa_enabled) {
              
              // } else {
              //   req.session.email = email;
              //   res.redirect('/dashboard');
              // }
          }else{
              res.send("Email and Password combination is incorrect");
          }
      }
  });
})

app.post('/register', async(req,res) => {
  const {email,password} = req.body;

  if (!isValidEmail(email)) {
    return res.status(400).send('Invalid email format');
  }

  const sql = 'INSERT into users_2 (email, password) values (?,?)';

  connection.query(sql, [email, password], (err,results) => {
    if(err){
      console.log("Database error",err);
      res.send("Account already Exists");
    }else{
      res.redirect('/login');
    }
  });

})

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

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