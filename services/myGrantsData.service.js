const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect();

exports.getMyFilteredGrantsData = () => {
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







exports.handleMyDashboard = (req,res) => {
    const keySearch = req.body.keyword;

    const sql = 'SELECT * from grants_trackings where title like ?';

    connection.query(sql, [`%${keySearch}%`], (err,results) => {
        if(err){
          res.send("Error executing SQL query: ' + error.stack");
        }else{
          res.render('dashboard',{data: results});
        }
    });
}