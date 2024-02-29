const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pa$$w0rd',
  database: 'loginsystem'
  
  });

module.exports=connection;