const mysql = require('mysql2');
require('dotenv').config();
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const session = require('express-session');
const password = process.env.dbPassword;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Parvathi@12345',
    database: 'loginsystem'
  });

exports.viewDashboard = (req,res) => {
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
}

exports.handleDashboard = (req,res) => {
    const keySearch = req.body.keyword;

    const sql = 'SELECT * from grants_trackings where title like ?';

    connection.query(sql, [`%${keySearch}%`], (err,results) => {
        if(err){
          res.send("Error executing SQL query: ' + error.stack");
        }else{
          res.render('dashboard',{data: results});
        }
    });
}

exports.viewDashboardetails = (req,res) => {
    const id = req.query.id; 
    const sql = 'SELECT * from grants_trackings WHERE id = ?';

    connection.query(sql,[id],(err,results) => {
      res.render('dashboard-view-details', { data: results });
    })
}

exports.enableTfa = (req,res) => {
    if (!req.session.email) {
        return res.redirect('/login');
      }
    
      const email = req.session.email;
    
        // Check if the user has already enabled TFA
        connection.query('SELECT is_tfa_enabled, secret_key FROM users_2 WHERE email = ?', [email], (err, results) => {
          if (err) {
            console.error(err.name);
            res.status(500).send('Error enabling TFA');
            return;
          }
    
          const isTfaEnabled = results[0].is_tfa_enabled;
          const secretKey = results[0].secret_key;
    
          if(isTfaEnabled && secretKey){
            res.render('enable-tfa', {qrCodeURL: null});
          }
          else{
            const newSecretKey = speakeasy.generateSecret({name : email, length: 20});
            console.log("secretKey",newSecretKey);
              const qrCodeImagePath = '../public/qr-code.png';
              QRCode.toFile(qrCodeImagePath, newSecretKey.otpauth_url);
        
              const sql = 'UPDATE users_2 SET is_tfa_enabled = 1, secret_key = ? WHERE email = ?';
    
              connection.query(sql, [newSecretKey.base32, email], (err) => {
                if (err) {
                  console.error(err.name);
                  res.status(500).send('Error enabling TFA');
                  return;
                }
                res.render('enable-tfa', {qrCodeURL: qrCodeImagePath});
    });
    }})
}

exports.verifyTfa = (req,res) => {
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
}