import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3080;

// Middleware to enable CORS
// This allows cross-origin requests, which is useful for APIs
app.use(cors());
// Middleware to parse JSON and URL-encoded data
// This is important for parsing incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Simulate a database with an array
// In a real application, you would use a database like MongoDB, PostgreSQL, etc.
const usuarios = [];
// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url} - ${req.body}`);
  next();
});
// Middleware to handle 500 errors
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
// Middleware to handle CORS preflight requests
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).json({});
  }
  next();
});

// Rotas
// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/usuarios', (req, res) => {
  console.log(req.body);
  // Vou simular a gravação de um usuário na array definida acima
  const { nome, idade } = req.body;
  if (!nome || !idade) {
    return res.status(400).json({ error: 'Nome e idade são obrigatórios' });
  }
  usuarios.push({ nome, idade });
  res.status(201).json({ message: 'Usuário criado com sucesso', usuario: { nome, idade } });
});

app.get('/usuarios', (req, res) => {
  // Retorna todos os usuários cadastrados
  res.status(200).json({ usuarios });
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
