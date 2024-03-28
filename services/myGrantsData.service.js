const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect();

exports.getMyFilteredGrantsData = (req) => {
    console.log("Entered here");
    userEmail = req.session.email;

    return new Promise((resolve, reject) => {
        // Get user's interests based on email
        const userInterestsQuery = `SELECT interests FROM users_2 WHERE email = ?`;
        connection.query(userInterestsQuery, [userEmail], (error, userInterests) => {
            if (error) {
                reject(error);
                return;
            }

            // Extract user's interests from the query result
            const interests = userInterests[0].interests;
            console.log("interests",interests)
            // Format current date as YYYY-MM-DD
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 4); // Add 4 days to the current date
            const formattedCurrentDate = currentDate.toISOString().split('T')[0];
            console.log("formattedCurrentDate",formattedCurrentDate)
            // Construct the SQL query to filter grants based on user's interests
            const query = `
                SELECT id, title, number, CloseDate, AwardCeiling 
                FROM grants_trackings 
                WHERE title LIKE '%${interests}%'
                AND CloseDate >= '${formattedCurrentDate}'
            `;

            // Execute the query to fetch filtered grants data
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
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