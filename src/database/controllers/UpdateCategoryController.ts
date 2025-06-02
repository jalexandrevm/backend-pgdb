import { UpdateCategoryService } from "../services/UpdateCategoryService";

export class UpdateCategoryController {
  async handle(req: any, res: any) {
    const { id } = req.params;
    if (!req.body) {
      return res.status(400).json({ error: 'Dados da categoria são obrigatórios' });
    }
    const { name, description } = req.body;

    if (!id || !name || !description) {
      return res.status(400).json({ error: 'Id, nome e descrição são obrigatórios' });
    }

    try {
      const updateCategoryService = new UpdateCategoryService();
      await updateCategoryService.execute(id, name, description);
      return res.status(200).json({ message: 'Categoria atualizada com sucesso' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
