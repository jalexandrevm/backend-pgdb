import { Router } from 'express';
import {
  CreateSecaoController, GetAllSecoesController, GetSecaoByCodigoController, UpdateSecaoController, DeleteSecaoController,
  CreateDepartamentoController, GetAllDepartamentosController, GetDepartamentoByIdController, UpdateDepartamentoController, DeleteDepartamentoController,
  CreateSubDepartamentoController, GetAllSubDepartamentosController, GetSubDepartamentoByIdController, UpdateSubDepartamentoController, DeleteSubDepartamentoController
} from '../database/controllers/SecaoDepSubDepController';

const routesSecaoDepSubDep = Router();

// Secao
routesSecaoDepSubDep.post('/secoes', new CreateSecaoController().handle);
routesSecaoDepSubDep.get('/secoes', new GetAllSecoesController().handle);
routesSecaoDepSubDep.get('/secoes/:codigo', new GetSecaoByCodigoController().handle);
routesSecaoDepSubDep.put('/secoes/:codigo', new UpdateSecaoController().handle);
routesSecaoDepSubDep.delete('/secoes/:codigo', new DeleteSecaoController().handle);

// Departamento
routesSecaoDepSubDep.post('/departamentos', new CreateDepartamentoController().handle);
routesSecaoDepSubDep.get('/departamentos', new GetAllDepartamentosController().handle);
routesSecaoDepSubDep.get('/departamentos/:codigoSecaoDep/:codigo', new GetDepartamentoByIdController().handle);
routesSecaoDepSubDep.put('/departamentos/:codigoSecaoDep/:codigo', new UpdateDepartamentoController().handle);
routesSecaoDepSubDep.delete('/departamentos/:codigoSecaoDep/:codigo', new DeleteDepartamentoController().handle);

// SubDepartamento
routesSecaoDepSubDep.post('/subdepartamentos', new CreateSubDepartamentoController().handle);
routesSecaoDepSubDep.get('/subdepartamentos', new GetAllSubDepartamentosController().handle);
routesSecaoDepSubDep.get('/subdepartamentos/:codigoSecaoSubD/:codigoDepartamentoSubD/:codigo', new GetSubDepartamentoByIdController().handle);
routesSecaoDepSubDep.put('/subdepartamentos/:codigoSecaoSubD/:codigoDepartamentoSubD/:codigo', new UpdateSubDepartamentoController().handle);
routesSecaoDepSubDep.delete('/subdepartamentos/:codigoSecaoSubD/:codigoDepartamentoSubD/:codigo', new DeleteSubDepartamentoController().handle);

export { routesSecaoDepSubDep };
