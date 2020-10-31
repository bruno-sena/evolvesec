const sql = require('mssql');

let dbConfig = {
	server: 'evolvesec.database.windows.net',
	user: 'brunosena',
	password: 'password',
	database: 'evolvesec',
	"options": {
		"encrypt": true,
		"enableArithAbort": true
	}
}

let conn = new sql.ConnectionPool(dbConfig);

conn.connect((err) => {
	if (err) throw err;
	console.log('Database Connected!')
})

module.exports = conn;