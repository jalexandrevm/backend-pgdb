import { myDbSource } from '../db-source';
import { Tecnico } from '../entities/Tecnico';

export class CreateTecnicoService {
  async execute(data: Partial<Tecnico>): Promise<Tecnico> {
    const tecnicoRepository = myDbSource.getRepository(Tecnico);
    const tecnico = tecnicoRepository.create(data);
    await tecnicoRepository.save(tecnico);
    return tecnico;
  }
}

export class GetAllTecnicosService {
  async execute(): Promise<Tecnico[]> {
    return myDbSource.getRepository(Tecnico).find();
  }
}

export class GetTecnicoByCodigoService {
  async execute(codigo: string): Promise<Tecnico | null> {
    return myDbSource.getRepository(Tecnico).findOneBy({ codigo });
  }
}

export class UpdateTecnicoService {
  async execute(codigo: string, data: Partial<Tecnico>): Promise<Tecnico | null> {
    const repo = myDbSource.getRepository(Tecnico);
    const tecnico = await repo.findOneBy({ codigo });
    if (!tecnico) return null;
    Object.assign(tecnico, data);
    await repo.save(tecnico);
    return tecnico;
  }
}

export class DeleteTecnicoService {
  async execute(codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Tecnico);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}
