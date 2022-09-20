const mysql = require('mysql');
// test.js
class login {
      constructor(db) {
		 this.db=db;
       }

        auth(email,passwords, callback) {
		// Ensure the input fields exists and are not empty
		if (email && passwords) {
			// Execute SQL query that'll select the account from the database based on the specified username and password
			this.db.query('SELECT * FROM users WHERE email = ? AND passwords = ?', [email, passwords], (error, results, fields ) => {
				// If there is an issue with the query, output the error
				if (error) throw error;
				// If the account exists
				return callback(error, results ? results.length > 0 : false);
			});
		} else {
			return false;
		}
       }
}

module.exports = login