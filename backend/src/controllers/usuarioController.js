const Usuario = require('../repository/Usuario');
const bcrypt = require('bcryptjs');

const usuarioController = {
  cadastrar: async (req, res) => {
    try {
      const { nome, usuario, email, senha } = req.body;

      // Verifica se o e-mail já existe
      const emailExistente = await Usuario.buscarPorEmail(email);
      if (emailExistente) {
        return res.status(400).json({ mensagem: 'E-mail já cadastrado.' });
      }

      // Verifica se o usuário já existe
      const usuarioExistente = await Usuario.buscarPorUsuario(usuario);
      if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Usuário já cadastrado.' });
      }

      // Criptografa a senha
      const saltos = 10;
      const senha_hash = await bcrypt.hash(senha, saltos);
      console.log(Usuario);
      // Insere no banco
      const novoUsuario = await Usuario.criar({
        nome,
        usuario,
        email,
        senha_hash
      });

      res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso!',
        id: novoUsuario.id
      });
    } catch (error) {
      console.error('Erro no cadastro:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
  },
  login: async (req, res) => {
    try {
      const { usuario, senha } = req.body; // Obtém usuário e senha do corpo da requisição

      // Validação básica
      if (!usuario || !senha) {
        return res.status(400).json({ mensagem: "Usuário e senha são obrigatórios." });
      }

      const usuarioValido = await Usuario.buscarPorUsuario(usuario);
      const senhaValida = await bcrypt.compare(senha, usuarioValido.senha_hash);

      // Se um dos dois estiverem incorretos, retorna erro
      if (!senhaValida || !usuarioValido) {
          return res.status(401).json({ mensagem: "Usuário ou senha incorretos." });
      }
      else {
      // Se as credenciais estão corretas
      res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        usuario: usuarioValido.usuario, // ou outros dados que queira enviar, menos a senha_hash!
      });}
    } 
      catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ mensagem: "Erro interno do servidor." });
    }}};

module.exports = usuarioController;
