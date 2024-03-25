const userService = require('../services/getUserName.service');

// Controller to fetch user data
exports.fetchUserData = (req, res) => {
    // Call a service function to fetch user data
    userService.getUserName((err, userData) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(userData);
    });
};