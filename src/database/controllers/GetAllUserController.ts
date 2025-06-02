import { GetAllUsersService } from "../services/GetAllUserService";

export class GetAllUsersController {
  async handle(request: any, response: any) {
    const getAllUsersService = new GetAllUsersService();
    try {
      const users = await getAllUsersService.execute();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
}
