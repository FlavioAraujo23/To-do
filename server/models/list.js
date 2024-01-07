const pool = require('../db');

class List {
  static async createListInDb(listData) {
    const client = await pool.connect();

    try{
      const result = await client.query(
        'INSERT INTO listas_tarefas(titulo, descricao, membro, usuario_id) VALUES($1, $2, $3, $4) RETURNING id',
        [listData.titulo, listData.descricao, listData.membro, listData.usuario_id]
      );

      const listid = result.rows[0].id;
      return listid;

    } catch (error) {
      console.error('Erro ao salvar a lista de tarefas:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = List;