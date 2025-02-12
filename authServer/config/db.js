import mysql from 'mysql2/promise';

const db = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 50
});

(async () => {
	try {
		const [rows] = await db.query('SELECT 1 + 1 AS result');
		console.log('Database connection is working:', rows[0].result);
	} catch (err) {
		console.error('Database connection error:', err);
	}
})();

export default db;
