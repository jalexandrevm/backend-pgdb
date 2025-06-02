import { GetAllCategoriesService } from "../services/GetAllCategoriesService";

export class GetAllCategoriesController {
  async handle(request: any, response: any) {
    const getAllCategoriesService = new GetAllCategoriesService();
    try {
      const categories = await getAllCategoriesService.execute();
      return response.status(200).json(categories);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
