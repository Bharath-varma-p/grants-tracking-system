const connection = require('../database');

// Service function to fetch user data
exports.getUserName = (email, callback) => {
  const sql = 'SELECT firstname, lastname, role FROM users_2 WHERE email = ?';
  connection.query(sql, [email], (err, results) => {
    console.log("email", email);
    if (err) {
      console.error('Error fetching user data:', err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, {}); // User not found
    }
    const { firstname, lastname, role } = results[0];
    callback(null, { firstname, lastname, role });
  });
};