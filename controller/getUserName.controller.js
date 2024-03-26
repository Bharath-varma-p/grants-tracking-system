const userService = require('../services/getUserName.service');

exports.fetchUserData = (req, res) => {
  // Get the email from the request object (e.g., req.user.email or req.query.email)
  const email = req.session.email; // Assuming the email is available in req.user.email
    console.log('req',req.session)
  // Call the service function with the email
  userService.getUserName(email, (err, userData) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(userData);
  });
};