import { myDbSource } from '../db-source';
import { Usuario } from '../entities/Usuario';

export class CreateUsuarioService {
  async execute(data: Partial<Usuario>): Promise<Usuario> {
    const usuarioRepository = myDbSource.getRepository(Usuario);
    const usuario = usuarioRepository.create(data);
    await usuarioRepository.save(usuario);
    return usuario;
  }
}

export class GetAllUsuariosService {
  async execute(): Promise<Usuario[]> {
    return myDbSource.getRepository(Usuario).find();
  }
}

export class GetUsuarioByCodigoService {
  async execute(codigo: string): Promise<Usuario | null> {
    return myDbSource.getRepository(Usuario).findOneBy({ codigo });
  }
}

export class UpdateUsuarioService {
  async execute(codigo: string, data: Partial<Usuario>): Promise<Usuario | null> {
    const repo = myDbSource.getRepository(Usuario);
    const usuario = await repo.findOneBy({ codigo });
    if (!usuario) return null;
    Object.assign(usuario, data);
    await repo.save(usuario);
    return usuario;
  }
}

export class DeleteUsuarioService {
  async execute(codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Usuario);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}
