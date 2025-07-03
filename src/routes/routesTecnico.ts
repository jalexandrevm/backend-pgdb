import { Router } from 'express';
import { CreateTecnicoController, GetAllTecnicosController, GetTecnicoByCodigoController, UpdateTecnicoController, DeleteTecnicoController } from '../database/controllers/TecnicoController';

const routesTecnico = Router();

routesTecnico.post('/tecnicos', new CreateTecnicoController().handle);
routesTecnico.get('/tecnicos', new GetAllTecnicosController().handle);
routesTecnico.get('/tecnicos/:codigoUsuario/:codigo', new GetTecnicoByCodigoController().handle);
routesTecnico.put('/tecnicos/:codigoUsuario/:codigo', new UpdateTecnicoController().handle);
routesTecnico.delete('/tecnicos/:codigoUsuario/:codigo', new DeleteTecnicoController().handle);

export { routesTecnico };
