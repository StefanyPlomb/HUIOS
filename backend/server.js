const express = require('express');
const cors = require('cors');
const path = require('path');
const usuariosRouter = require('./src/routes/usuarioRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Servir arquivos estáticos de várias pastas fora do backend

app.use('/HTML', express.static(path.join(__dirname, '../HTML')));
app.use('/CSS', express.static(path.join(__dirname, '../CSS')));
app.use('/JS', express.static(path.join(__dirname, '../JS')));
app.use('/SRC', express.static(path.join(__dirname, '../SRC')));
app.use('/docker', express.static(path.join(__dirname, '../docker')));

// --- Rotas da API
app.use('/api', usuariosRouter);

// Rota raiz (exemplo: abrir IndexVisitas.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../HTML/IndexVisitas.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});