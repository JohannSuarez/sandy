var mysql = require('mysql2');

require('dotenv').config()                  // To use .env files

var con = mysql.createConnection({
  host: process.env.SQL_ADDR,
  user: process.env.SQL_NAME,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DB

});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


con.query(
  'SHOW TABLES',
  function(err, results, fields) {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);
