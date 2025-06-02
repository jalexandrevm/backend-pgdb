import { CreateCategoryService } from "../services/CreateCategoryService";

export class CreateCategoryController {
  async handle(request: any, response: any) {
    const { id, name, description } = request.body;
    const createCategoryService = new CreateCategoryService();
    try {
      const category = await createCategoryService.execute(id, name, description);
      return response.status(201).json(category);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
