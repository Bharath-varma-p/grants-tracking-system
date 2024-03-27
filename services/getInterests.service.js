const connection = require('../database');

// Service function to fetch user data
exports.getInterests = (req, callback) => {
  const email = req.session.email;
  const sql = 'SELECT interests FROM users_2 WHERE email = ?';
  connection.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user interests data:', err);
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, {}); // User not found
    }

    const interests = results[0].interests;

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 4); // Add 4 days to the current date
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];

    const query = `
    SELECT count(title) as count
    FROM grants_trackings 
    WHERE title LIKE '%${interests}%'
    AND CloseDate >= '${formattedCurrentDate}'
    `;

    connection.query(query,[interests], (err,countResults)=>{
      if (err) {
        console.error('Error fetching user interests data:', err);
        return callback(err, null);
      }
      const count  = countResults[0].count;
      callback(null, { count, interests });
    })
  });
};