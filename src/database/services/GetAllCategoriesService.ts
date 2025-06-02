import { myDbSource } from "../db-source"
import { Category } from "../entities/Category";

export class GetAllCategoriesService {
  async execute(): Promise<Category[]> {
    const categoryRepository = myDbSource.getRepository(Category);
    const categories = await categoryRepository.find();
    return categories;
  }
}
