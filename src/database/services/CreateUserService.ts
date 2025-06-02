import { myDbSource } from "../db-source";
import { User } from "../entities/User";

type UserRequest = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}
export class CreateUserService {
  async execute(id: number, firstName: string, lastName: string, age: number): Promise<User> {
    if (id < 0) {
      throw new Error('ID inválido');
    }
    const userRepository = myDbSource.getRepository(User);
    if (id === 0) {
      const newId = await userRepository.maximum("id");
      if (newId === null) {
        id = 1;
      } else {
        id = newId + 1;
      }
    }
    const userExists = await userRepository.findOneBy({ id });
    if (userExists) {
      throw new Error('Usuário já existe');
    }
    const user = userRepository.create({ id, firstName, lastName, age });
    console.log(user);

    await userRepository.insert(user);
    return user;
  }
}
