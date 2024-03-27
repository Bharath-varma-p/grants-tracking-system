require('dotenv').config();
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const connection = require('../database');
const qrcodepath = require('./constants');

exports.countTotalPages = (req, res) => {
  // Your session check logic goes here if needed

  const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided
  const sql = 'SELECT COUNT(*) AS total FROM grants_trackings'; // Query to count total records
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error counting total pages:', err);
      return res.status(500).send('Error counting total pages');
    }
    const totalRecords = results[0].total; // Extract total count from results
    const totalPages = Math.ceil(totalRecords / limit); // Calculate total pages
    console.log("totalPages",totalPages);
    res.send(totalPages.toString()); // Send total pages count as response
  });
};




const grantsService = require('../services/grantsService.service.js');

exports.getDataDashboard = async (req, res) => {
  try {
    const data = await grantsService.getFilteredGrantsData(req);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};







exports.viewDashboard = (req,res) => {
    if (!req.session.email) {
        return res.redirect('/login'); // Redirect to login if not logged in
      }
      
      // Access the email from the session
        const userEmail = req.session.email;

        // const page = parseInt(req.query.page) || 1; 
        // const limit = parseInt(req.query.limit) || 10;
        // const offset =  (page - 1)*limit;
      
        const sql = 'SELECT * from grants_trackings';
        // console.log("SQL",sql);
        connection.query(sql, (err,results) => {
         // console.log("results",results);
          console.log("results in render",results.length);
            res.render('dashboard', { data:results});
        })
};

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
            // change this path in constants.js file
            const qrCodeImagePath = qrcodepath.QRCODEPATH;
            
            QRCode.toFile(qrCodeImagePath, newSecretKey.otpauth_url);

            const qrCodeUrl = "qr-code.png"
        
            const sql = 'UPDATE users_2 SET is_tfa_enabled = 1, secret_key = ? WHERE email = ?';
    
              connection.query(sql, [newSecretKey.base32, email], (err) => {
                if (err) {
                  console.error(err.name);
                  res.status(500).send('Error enabling TFA');
                  return;
                }
                res.render('enable-tfa', {qrCodeURL: qrCodeUrl});
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
      res.redirect('/my_dashboard_view');
    } else {
      res.status(401).send({message: 'Invalid token'});
    }
  });
}