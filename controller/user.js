const mysql = require('mysql2');
require('dotenv').config();

const connection = require('../database');

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
    const {firstname,lastname,email,password} = req.body;
  
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
                // const user = results[0];
                // const tfa_enabled = user.is_tfa_enabled;
                // // console.log("tfa_enabled",tfa_enabled)
                req.session.email = req.body.email;
                res.redirect('/enable-tfa');
            }else{
                res.send("Email and Password combination is incorrect");
            }
        }
    });
}

exports.handleRegister = (req,res) => {
    const {firstname,lastname,email,password} = req.body;
console.log("password", req.body['confirm-password']);

    if (!isValidEmail(email)) {
      return res.status(400).send('Invalid email format');
}
  
     // Check if passwords match
     if (password !== req.body['confirm-password']) {
      return res.status(400).send('Passwords do not match');
    }
  
    const sql = 'INSERT into users_2 (firstname, lastname, email, password) values (?,?,?,?)';

  
    connection.query(sql, [firstname,lastname,email, password], (err,results) => {
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



