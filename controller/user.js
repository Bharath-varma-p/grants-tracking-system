const mysql = require('mysql2');
require('dotenv').config();

const connection = require('../database');
const userService = require('../services/getUserName.service');

exports.renderLogin = (req,res) => {
    res.render('login');
}

exports.renderRegister = (req,res) => {
    res.render('signup');
}

exports.logout = (req,res) => {
    req.session.destroy(err => {
        if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Internal Server Error');
        } else {
          // Redirect to the login page or any other appropriate page
          res.redirect('/login'); 
        }
      });
}

exports.handleLogin = async (req,res) => {
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
            console.log("results",results);
            if (results.length >= 1) {
              req.session.email = req.body.email;

              // Pass the logged-in user's email to the service function
              userService.getUserName(req.body.email, (err, userData) => {
                  if (err) {
                      console.error('Error fetching user data:', err);
                      // Handle error
                  } else {
                      // Use userData as needed
                      console.log('User data:', userData);
                      res.redirect('/enable-tfa');
                  }
              });
          } else {
              res.status(400).send('Email and Password combination is incorrect');
          }
      }
  });
}

exports.fetchUserRole = (req,res)=>{
  console.log("fetchUserRole");
  var email = req.query.email;
  console.log("email",email);
  const sql = 'SELECT firstname, role FROM users_2 WHERE email = ?';

  connection.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { firstname, role } = results[0];
    console.log("json result",results[0]);
    res.json({ firstname, role });
  });
}

exports.handleRegister = (req,res) => {
    const {firstname,lastname,email,password} = req.body;
console.log("password", req.body['confirm-password']);

    if (!isValidEmail(email)) {
      return res.status(400).send('Invalid email format');
    }

    if(email.toUpperCase().includes ("ITAC")){
      role = "admin"
    }else{
      role = "user"
    }
  
     // Check if passwords match
     if (password !== req.body['confirm-password']) {
      return res.status(400).send('Passwords do not match');
    }
  
    const sql = 'INSERT into users_2 (firstname, lastname, email, password, role) values (?,?,?,?,?)';

  
    connection.query(sql, [firstname,lastname,email, password, role], (err,results) => {
      if(err){
        console.log("Database error",err);
        res.send("Account already Exists");
      }else{
        res.redirect('/login');
      }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }




