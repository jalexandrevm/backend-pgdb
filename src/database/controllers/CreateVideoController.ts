import { CreateVideoService } from "../services/CreateVideoService";

export class CreateVideoController {
  async handle(request: any, response: any): Promise<any> {
    const { id, name, description, category_id, duration } = request.body;

    // Validate required fields
    if (!name || !description || !category_id || !duration) {
      return response.status(400).json({ error: 'Nome, descrição, categoria_id e duração são obrigatórios' });
    }

    const createVideoService = new CreateVideoService();

    try {
      const video = await createVideoService.execute(id, name, description, category_id, duration);
      return response.status(201).json(video);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
