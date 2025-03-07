const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "fafa1234",
    database: "piatti"
})

connection.connect((err) => {
    if (err) throw err;
    console.log("Connection to dadaa");
});
module.exports = connection;