const pool = require('../db');
const bcrypt = require('bcrypt');
class User {
  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    return result.rows[0];
  }
  
  static async createUser(nome, email, senha) {
    const hashedSenha = bcrypt.hashSync(senha, 10);

    const result = await pool.query(
      "INSERT INTO usuarios (nome_completo, email, senha) VALUES ($1, $2, $3) RETURNING *",
      [nome, email, hashedSenha]);

      return result.rows[0];
  }
}

module.exports = User;