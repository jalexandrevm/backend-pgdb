import { myDbSource } from "../db-source"
import { Category } from "../entities/Category";
import { v4 as uuidv4 } from 'uuid';

type CategoryRequest = {
  id: string;
  name: string;
  description: string;
}

export class CreateCategoryService {
  async execute(id: string, name: string, description: string): Promise<Category> {
    if (id === "") {
      id = uuidv4(); // Generate a new UUID if id is not provided
    }
    const categoryRepository = myDbSource.getRepository(Category);
    const categoryNameExists = await categoryRepository.findOneBy({ name });
    if (categoryNameExists) {
      throw new Error('Nome da Categoria já existe');
    }
    const categoryIdExists = await categoryRepository.findOneBy({ id });
    if (categoryIdExists) {
      throw new Error('Id da Categoria já existe');
    }
    const category = categoryRepository.create({ id, name, description });
    await categoryRepository.save(category);
    return category;
  }
}
