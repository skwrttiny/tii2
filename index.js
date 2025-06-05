const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Configure sua conexão PostgreSQL
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
});

// Rota que retorna os dados da tabela
app.get('/dados', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM transferencia_por_url');
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao buscar dados');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
