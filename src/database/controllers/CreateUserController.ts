import { CreateUserService } from "../services/CreateUserService";

export class CreateUserController {
  async handle(request: any, response: any) {
    const { id, firstName, lastName, age } = request.body;
    const createUserService = new CreateUserService();
    try {
      const user = await createUserService.execute(id, firstName, lastName, age);
      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
