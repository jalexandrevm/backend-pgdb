import { Router } from "express";
import { CreateCategoryController } from "../database/controllers/CreateCategoryController";
import { GetAllCategoriesController } from "../database/controllers/GetAllCategoriesController";
import { DeleteCategoryController } from "../database/controllers/DeleteCategoryController";
import { UpdateCategoryController } from "../database/controllers/UpdateCategoryController";

const routesCategory = Router();

routesCategory.post('/categories', new CreateCategoryController().handle);
routesCategory.get('/categories', new GetAllCategoriesController().handle);
routesCategory.put('/categories/:id', new UpdateCategoryController().handle);
routesCategory.delete('/categories/:id', new DeleteCategoryController().handle);

export { routesCategory };
