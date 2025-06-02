import { Router } from 'express';
import { CreateTecnicoController, GetAllTecnicosController, GetTecnicoByCodigoController, UpdateTecnicoController, DeleteTecnicoController } from '../database/controllers/TecnicoController';

const routesTecnico = Router();

routesTecnico.post('/tecnicos', new CreateTecnicoController().handle);
routesTecnico.get('/tecnicos', new GetAllTecnicosController().handle);
routesTecnico.get('/tecnicos/:codigo', new GetTecnicoByCodigoController().handle);
routesTecnico.put('/tecnicos/:codigo', new UpdateTecnicoController().handle);
routesTecnico.delete('/tecnicos/:codigo', new DeleteTecnicoController().handle);

export { routesTecnico };
