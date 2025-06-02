import { myDbSource } from "../db-source";
import { Category } from "../entities/Category";

export class UpdateCategoryService {
  async execute(id: string, name: string, description: string): Promise<void> {
    const categoryRepository = myDbSource.getRepository(Category);

    // Check if the category exists
    const categoryById = await categoryRepository.findOneBy({ id });
    if (!categoryById) {
      throw new Error('Categoria não encontrada');
    }

    // Check if the new name already exists
    const categoryByName = await categoryRepository.findOneBy({ name });
    if (categoryByName && categoryByName.id !== id) {
      throw new Error('Nome da Categoria já existe');
    }
    console.log(new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" })
    ));

    // Update the category
    categoryById.name = name;
    categoryById.description = description;
    categoryById.updated_at = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    await categoryRepository.save(categoryById);
  }
}
