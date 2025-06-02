import { DeleteVideoService } from "../services/DeleteVideoService";

export class DeleteVideoController {
  async handle(req: any, res: any) {
    const { id } = req.params;
    const deleteVideoService = new DeleteVideoService();

    try {
      await deleteVideoService.execute(id);
      return res.status(200).json({ message: `Vídeo com id ${id}, deletado com sucesso` });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}
