import { DeleteCategoryService } from "../services/DeleteCategoryService";

export class DeleteCategoryController {
  async handle(req: any, res: any) {
    // Extract the category ID from the request parameters
    const { id } = req.params;
    // console.log(`Deletando categoria com ID: ${id}`);

    if (!id) {
      return res.status(400).json({ error: 'ID da categoria é obrigatório' });
    }

    const deleteCategoryService = new DeleteCategoryService();

    try {
      const resultado = await deleteCategoryService.execute(id);
      // Return a success message
      return res.status(200).json({ message: `Sucesso. ${resultado.message}` });
    } catch (err) {
      // console.log("Categoria não encontrada:");
      // If an error occurs, return a 500 error
      return res.status(500).json({ error: `Erro ao deletar categoria. ${err.message}` });
    }
  }
}
