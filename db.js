var mysql = require("mysql");

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'dictionary'
});

connection.connect(function(error) {
  if (error) {
    console.log("Database connection failed: ", error);
  } else {
    console.log("Connected to the database.");
  }
});

module.exports = connection;
