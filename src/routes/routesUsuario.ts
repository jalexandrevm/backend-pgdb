import { Router } from "express";
import { CreateUsuarioController, GetAllUsuariosController, GetUsuarioByCodigoController, UpdateUsuarioController, DeleteUsuarioController } from '../database/controllers/UsuarioController';

const routesUsuario = Router();

routesUsuario.post('/usuarios', new CreateUsuarioController().handle);
routesUsuario.get('/usuarios', new GetAllUsuariosController().handle);
routesUsuario.get('/usuarios/:codigo', new GetUsuarioByCodigoController().handle);
routesUsuario.put('/usuarios/:codigo', new UpdateUsuarioController().handle);
routesUsuario.delete('/usuarios/:codigo', new DeleteUsuarioController().handle);

export { routesUsuario };
