const mysql = require('mysql2/promise');

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

(async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('Database connection is working:', rows[0].result); // Should log "2"
  } catch (err) {
    console.error('Database connection error:', err);
  }
})();

module.exports = db;
