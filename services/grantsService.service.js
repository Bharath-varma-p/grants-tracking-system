const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect();

exports.getFilteredGrantsData = () => {
    return new Promise((resolve, reject) => {
        const currentDate = new Date(); // Get current date
        currentDate.setDate(currentDate.getDate() + 4); // Add 4 days to the current date

        // Format current date as YYYY-MM-DD
        const formattedCurrentDate = currentDate.toISOString().split('T')[0];

        // Construct the SQL query to filter data where CloseDate is 4 days or more in the future
        const query = `SELECT id, title, number, CloseDate, AwardCeiling FROM grants_trackings WHERE CloseDate >= '${formattedCurrentDate}'`;

        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};


exports.fetchDashboardDetails = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM grants_trackings WHERE id = ?';
        connection.query(query, [id], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]); // Assuming there's only one result
            }
        });
    });
};
