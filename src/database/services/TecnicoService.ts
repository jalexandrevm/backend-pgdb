import { myDbSource } from '../db-source';
import { Tecnico } from '../entities/Tecnico';
import { Usuario } from '../entities/Usuario';

export class CreateTecnicoService {
  async execute(data: Partial<Tecnico>): Promise<Tecnico> {
    // Verifica se o código do usuário enviado existe
    data.codigoUsuario = data.codigoUsuario?.toString().padStart(6, '0');
    const usuarioRepository = myDbSource.getRepository(Usuario);
    const usuarioExists = await usuarioRepository.findOneBy({ codigo: data.codigoUsuario });
    if (!usuarioExists) {
      throw new Error(`Usuário com código '${data.codigoUsuario}' não encontrado.`);
    }

    // Verifica se os dados enviados para criar o técnico são válidos
    const tecnicoRepository = myDbSource.getRepository(Tecnico);
    if (data.codigo) {
      const codigoNum = Number(data.codigo);
      if (isNaN(codigoNum) || codigoNum <= 0) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(6, '0');
      const exists = await tecnicoRepository.findOneBy({ codigo: data.codigo });
      if (exists) {
        throw new Error(`Já existe técnico com o campo 'codigo' = '${data.codigo}'`);
      }
    } else {
      const maxCodigoResult = await tecnicoRepository.find({
        select: ["codigo"],
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        console.log("No existing tecnicos found, starting with codigo 1.");
        data.codigo = "1".padStart(6, '0'); // Start with 1 if no tecnicos exist
      } else {
        console.log(`Max codigo found: ${JSON.stringify(maxCodigoResult)}`);
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(6, '0');
        console.log(`New codigo assigned: ${data.codigo}`);
      }
    }
    if (data.nome) {
      const exists = await tecnicoRepository.findOneBy({ nome: data.nome });
      if (exists) {
        throw new Error(`Já existe técnico com o campo 'nome' = '${data.nome}'`);
      }
    };
    const tecnico = tecnicoRepository.create(data);
    await tecnicoRepository.save(tecnico);
    return tecnico;
  }
}

export class GetAllTecnicosService {
  async execute(): Promise<Tecnico[]> {
    return myDbSource.getRepository(Tecnico).find({ relations: ['usuario'] });
  }
}

export class GetTecnicoByCodigoService {
  async execute(codigoUsuario: string, codigo: string): Promise<Tecnico | null> {
    codigoUsuario = codigoUsuario.toString().padStart(6, '0');
    codigo = codigo.toString().padStart(6, '0');
    return myDbSource.getRepository(Tecnico).findOneBy({ codigoUsuario, codigo });
  }
}

export class UpdateTecnicoService {
  async execute(codigoUsuario: string, codigo: string, data: Partial<Tecnico>): Promise<Tecnico | null> {
    if (data.codigo !== undefined) {
      throw new Error("Não é permitido alterar o campo 'codigo' do técnico.");
    }
    const repo = myDbSource.getRepository(Tecnico);
    codigoUsuario = codigoUsuario.toString().padStart(6, '0');
    codigo = codigo.toString().padStart(6, '0');
    const tecnico = await repo.findOneBy({ codigoUsuario, codigo });
    if (!tecnico) return null;
    Object.assign(tecnico, data);
    await repo.save(tecnico);
    return tecnico;
  }
}

export class DeleteTecnicoService {
  async execute(codigoUsuario: string, codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Tecnico);
    codigoUsuario = codigoUsuario.toString().padStart(6, '0');
    codigo = codigo.toString().padStart(6, '0');
    const result = await repo.delete({ codigoUsuario, codigo });
    return result.affected !== 0;
  }
}
