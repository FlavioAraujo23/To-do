const pool = require('../db');

class User {
  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    return result.rows[0];
  }
}

module.exports = User;