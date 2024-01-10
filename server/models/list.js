const pool = require('../db');

class List {
  static async createListInDb(listData) {
    const client = await pool.connect();

    try{
      const result = await client.query(
        'INSERT INTO listas_tarefas(titulo, descricao, membro, usuario_id) VALUES($1, $2, $3, $4) RETURNING *',
        [listData.titulo, listData.descricao, listData.membro, listData.usuario_id]
      );

      const list = result.rows[0];

      await client.query(
        'INSERT INTO listas_usuarios(lista_id,usuario_id) VALUES($1, $2) RETURNING *',
        [list.id, listData.usuario_id]
      );
      return list;

    } catch (error) {
      console.error('Erro ao salvar a lista de tarefas:', error);
      throw error;
    } finally {
      client.release();
    }
  }
  static async getListsById(userId){
    const client = await pool.connect();
    try {
      const result = await client.query(
        `
         SELECT lt.*
         FROM listas_tarefas lt
         LEFT JOIN convites c ON lt.id = c.lista_id
         WHERE lt.usuario_id = $1 OR c.destinatario_id = $1
        `, [userId]
      );
      const lists = result.rows;
      return lists;

    } catch(error) {
      console.error('Erro ao buscar listas de tarefas:', error);
      throw error;
    } finally {
      client.release();
    }

  }

  static async inviteUserForList(listId, inviteUserId, ownerId, name) {
    const client = await pool.connect();

      try{
        const result = await client.query(
          `
            INSERT INTO convites (remetente_id, destinatario_id, lista_id, nome_destinatario)
            VALUES ($1, $2, $3, $4)
            RETURNING *
          `,
          [ownerId, inviteUserId, listId, name]
        );

        return result.rows[0];
      } catch (error) {
        console.error('Erro ao convidar usuário para a lista:', error);
        throw error;
      } finally {
        client.release();
      }
  }

  static async createTodoInDb(title, progress, member, description, listId) {
    const client = await pool.connect();

    try{
      const result = await client.query(
        `
          INSERT INTO tarefas (titulo, descricao, progresso, lista_id, membro)
          VALUES ($1, $2, $3, $4, $5) 
          RETURNING *
        `,
        [title, description, progress, listId, member]
      )
      return result.rows[0]
    } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        throw error;
      } finally {
        client.release();
      }
  }
}

module.exports = List;