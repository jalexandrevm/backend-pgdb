import { Router } from 'express';
import { CreateClienteController, GetAllClientesController, GetClienteByCodigoController, UpdateClienteController, DeleteClienteController } from '../database/controllers/ClienteController';

const routesCliente = Router();

routesCliente.post('/clientes', new CreateClienteController().handle);
routesCliente.get('/clientes', new GetAllClientesController().handle);
routesCliente.get('/clientes/:codigo', new GetClienteByCodigoController().handle);
routesCliente.put('/clientes/:codigo', new UpdateClienteController().handle);
routesCliente.delete('/clientes/:codigo', new DeleteClienteController().handle);

export { routesCliente };
