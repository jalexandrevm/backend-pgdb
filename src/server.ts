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
import { routesUsuario } from './routes/routesUsuario';
import { routesTecnico } from './routes/routesTecnico';
import { routesEmpresa } from './routes/routesEmpresa';
import { routesCliente } from './routes/routesCliente';
import { routesSecaoDepSubDep } from './routes/routesSecaoDepSubDep';
import { routesStatus } from './routes/routesStatus';
import { routesSituacao } from './routes/routesSituacao';
import { routesProduto, routesProdutoAuxiliar } from './routes/routesProduto';
import { routesAtendimento } from './routes/routesAtendimento';
import { routesSyspdv } from './routes/routesSyspdv';

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

app.use("/apiv1/app", routesUsuario);
app.use("/apiv1/app", routesTecnico);
app.use("/apiv1/app", routesEmpresa);
app.use("/apiv1/app", routesCliente);
app.use("/apiv1/app", routesSecaoDepSubDep);
app.use("/apiv1/app", routesStatus);
app.use("/apiv1/app", routesSituacao);
app.use("/apiv1/app", routesProduto);
app.use("/apiv1/app", routesProdutoAuxiliar);
app.use("/apiv1/app", routesAtendimento);
app.use('/apiv1/syspdv', routesSyspdv);
app.use("/apiv1/app", routesSecaoDepSubDep);

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
