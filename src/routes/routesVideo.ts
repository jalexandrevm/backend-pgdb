import { Router } from "express";
import { CreateVideoController } from "../database/controllers/CreateVideoController";
import { GetAllVideoController } from "../database/controllers/GetAllVideoController";
import { UpdateVideoController } from "../database/controllers/UpdateVideoController";
import { DeleteVideoController } from "../database/controllers/DeleteVideoController";

const routesVideo = Router();

routesVideo.post('/videos', new CreateVideoController().handle);
routesVideo.get('/videos', new GetAllVideoController().handle);
routesVideo.put('/videos/:id', new UpdateVideoController().handle);
routesVideo.delete('/videos/:id', new DeleteVideoController().handle);

export { routesVideo };
