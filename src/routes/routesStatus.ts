import { Router } from 'express';
import { CreateStatusController, GetAllStatusController, GetStatusByCodigoController, UpdateStatusController, DeleteStatusController } from '../database/controllers/StatusController';

const routesStatus = Router();

routesStatus.post('/status', new CreateStatusController().handle);
routesStatus.get('/status', new GetAllStatusController().handle);
routesStatus.get('/status/:codigo', new GetStatusByCodigoController().handle);
routesStatus.put('/status/:codigo', new UpdateStatusController().handle);
routesStatus.delete('/status/:codigo', new DeleteStatusController().handle);

export { routesStatus };
