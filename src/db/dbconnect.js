const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'sql10.freesqldatabase.com',
  user: 'sql10715794',
  password: 'ALbBPx5EPV',
  database: 'sql10715794',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  conn: pool.promise()
};
