const pool = require('../config/database');

const Usuario = {
  criar: async (dados) => {
    const { nome, usuario, email, senha_hash } = dados;
    const query = `
      INSERT INTO usuario (nome, usuario, email, senha_hash)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    const values = [nome, usuario, email, senha_hash];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  buscarPorEmail: async (email) => {
    const query = 'SELECT * FROM usuario WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  buscarPorUsuario: async (usuario) => {
    const query = 'SELECT * FROM usuario WHERE usuario = $1';
    const result = await pool.query(query, [usuario]);
    return result.rows[0];
  }
};

module.exports = Usuario;