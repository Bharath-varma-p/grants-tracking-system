const analyticsService = require('../services/analyticsService.service');

// Controller to render the analytics page
exports.showAnalyticsPage = (req, res) => {
    res.render('analytics'); // Assuming your analytics view file is named 'analytics.hbs'
};

// Controller to fetch data for analytics
exports.getData = (req, res) => {
    // Call a service function to fetch data
    analyticsService.getData((err, data) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(data);
    });
};
