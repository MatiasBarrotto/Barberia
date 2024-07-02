const pool = mysql.createPool({
  host: 'sql10.freesqldatabase.com',
  user: 'sql10717263',
  password: 'kVyQvapZqq',
  database: 'sql10717263',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  conn: pool.promise()
};
