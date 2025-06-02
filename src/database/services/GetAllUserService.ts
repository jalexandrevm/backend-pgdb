import { myDbSource } from "../db-source"
import { User } from "../entities/User";

export class GetAllUsersService {
  async execute(): Promise<User[]> {
    const userRepository = myDbSource.getRepository(User);
    const users = await userRepository.find();
    return users;
  }
}
