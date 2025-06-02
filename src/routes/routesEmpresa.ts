import { Router } from 'express';
import { CreateEmpresaController, GetAllEmpresasController, GetEmpresaByCodigoController, UpdateEmpresaController, DeleteEmpresaController } from '../database/controllers/EmpresaController';

const routesEmpresa = Router();

routesEmpresa.post('/empresas', new CreateEmpresaController().handle);
routesEmpresa.get('/empresas', new GetAllEmpresasController().handle);
routesEmpresa.get('/empresas/:codigo', new GetEmpresaByCodigoController().handle);
routesEmpresa.put('/empresas/:codigo', new UpdateEmpresaController().handle);
routesEmpresa.delete('/empresas/:codigo', new DeleteEmpresaController().handle);

export { routesEmpresa };
