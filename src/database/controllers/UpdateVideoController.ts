import { UpdateVideoService } from "../services/UpdateVideoService";

export class UpdateVideoController {
  async handle(request: any, response: any) {
    const { id } = request.params;
    const { name, description, duration, category_id } = request.body;
    if (!id || !name || !description || !duration || !category_id) {
      return response.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const updateVideoService = new UpdateVideoService();

    try {
      await updateVideoService.execute(id, name, description, duration, category_id);
      return response.status(200).json({ message: 'Vídeo atualizado com sucesso' });
    } catch (err) {
      return response.status(500).json({ error: `Erro ao atualizar vídeo`, details: err.message });
    }
  }
}
