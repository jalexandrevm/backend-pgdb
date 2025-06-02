import 'reflect-metadata';
import express, { Request, Response } from 'express';
import cors from 'cors';

// Conectando ao banco de dados
// Importando o arquivo de configuração do banco de dados
// e inicializando a conexão
import { myDbSource } from './database/db-source';
myDbSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

// Importando as rotas
import { routesCategory } from './routes/routesCategory';
import { routesUser } from './routes/routesUser';
import { routesVideo } from './routes/routesVideo';
import { routesEmpresa } from './routes/routesEmpresa';
import { routesUsuario } from './routes/routesUsuario';
import { routesTecnico } from './routes/routesTecnico';
import { routesStatus } from './routes/routesStatus';
import { routesSituacao } from './routes/routesSituacao';
import { routesProduto } from './routes/routesProduto';
import { routesCliente } from './routes/routesCliente';

const app = express();
const PORT = process.env.PORT || 3081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const usuarios = [];

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url} - ${req.body}`);
  next();
});

app.use(routesUser);
app.use(routesUsuario);
app.use(routesEmpresa);
app.use(routesTecnico);
app.use(routesStatus);
app.use(routesSituacao);
app.use(routesProduto);
app.use(routesCategory);
app.use(routesVideo);
app.use(routesCliente);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: `Route not Found ${req.protocol}://${req.host}${req.url}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
