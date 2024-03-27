const userService = require('../services/getUserName.service');
const connection = require('../database');

exports.fetchUserData = (req, res) => {
  // Get the email from the request object (e.g., req.user.email or req.query.email)
  const email = req.session.email; // Assuming the email is available in req.user.email
  // Call the service function with the email
  userService.getUserName(email, (err, userData) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(userData);
  });
};



exports.fetchChartData = (req, res) => {
    // Execute the SQL query to fetch chart data
    const query = `
      SELECT category, COUNT(grant_id) AS grant_count
      FROM classified_grants
      GROUP BY category;
    `;
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Error fetching chart data' });
        return;
      }
      
      // Send the fetched data as JSON response
      res.json(results);
    });
  };