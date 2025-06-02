import { Router } from "express";
import { CreateUserController } from '../database/controllers/CreateUserController';
import { GetAllUsersController } from '../database/controllers/GetAllUserController';

const routesUser = Router();

routesUser.post('/users', new CreateUserController().handle);
routesUser.get('/users', new GetAllUsersController().handle);

export { routesUser };
