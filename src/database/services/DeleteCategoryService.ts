import { myDbSource } from "../db-source";
import { Category } from "../entities/Category";

export class DeleteCategoryService {
  async execute(id: string) {
    console.log("Entramos no serviço de exclusão de categoria");

    const categoryRepository = myDbSource.getRepository(Category);

    console.log(`Service deleting category with ID: ${id}`);

    try {
      // Find the category by ID
      const category = await categoryRepository.findOneBy({ id });
      console.log("Category found:", category);
      if (!category) {
        throw new Error("Category not found");
      }

      // Delete the category
      const result = await categoryRepository.delete(id);

      return { message: `Category with id ${id}, deleted successyfully` };
    } catch (error) {
      // If the category does not exist, throw an error
      throw new Error("Category not found");
    }
  }
}
