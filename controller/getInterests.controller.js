const interestsService = require('../services/getInterests.service');

exports.fetchInterests = async (req, res) => {
  // Get the email from the request object (e.g., req.user.email or req.query.email) // Assuming the email is available in req.user.email
  // Call the service function with the email
  interestsService.getInterests(req, (err, results) => {
    if (err) {
      console.error('Error fetching user interests data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
};