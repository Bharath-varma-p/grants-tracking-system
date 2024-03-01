const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect();

exports.getFilteredGrantsData = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT id, title, number, CloseDate, AwardCeiling FROM grants_trackings';
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
