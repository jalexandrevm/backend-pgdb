import { myDbSource } from '../db-source';
import { Usuario } from '../entities/Usuario';

export class CreateUsuarioService {
  async execute(data: Partial<Usuario>): Promise<Usuario> {
    const usuarioRepository = myDbSource.getRepository(Usuario);
    // Verifica se algum dos campos únicos já existe
    // Verifica cada campo único individualmente e retorna erro ao encontrar o primeiro existente
    if (data.codigo) {
      const codigoNum = Number(data.codigo);
      if (isNaN(codigoNum) || codigoNum <= 0) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(6, '0');
      const exists = await usuarioRepository.findOneBy({ codigo: data.codigo });
      if (exists) {
        throw new Error(`Já existe usuário com o campo 'codigo' = '${data.codigo}'`);
      }
    } else {
      const maxCodigoResult = await usuarioRepository.find({
        select: ["codigo"],
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        console.log("No existing usuarios found, starting with codigo 1.");
        data.codigo = "000001"; // Start with 1 if no usuarios exist
      } else {
        console.log(`Max codigo found: ${JSON.stringify(maxCodigoResult)}`);
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(6, '0');
        console.log(`New codigo assigned: ${data.codigo}`);
      }
    }
    if (data.nome) {
      const exists = await usuarioRepository.findOneBy({ nome: data.nome });
      if (exists) {
        throw new Error(`Já existe usuário com o campo 'nome' = '${data.nome}'`);
      }
    }
    if (data.apelido) {
      const exists = await usuarioRepository.findOneBy({ apelido: data.apelido });
      if (exists) {
        throw new Error(`Já existe usuário com o campo 'apelido' = '${data.apelido}'`);
      }
    }
    if (data.email) {
      const exists = await usuarioRepository.findOneBy({ email: data.email });
      if (exists) {
        throw new Error(`Já existe usuário com o campo 'email' = '${data.email}'`);
      }
    }
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
    if (data.codigo !== undefined) {
      throw new Error("Não é permitido alterar o campo 'codigo' do usuário.");
    };
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
