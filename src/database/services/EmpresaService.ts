import { myDbSource } from '../db-source';
import { Empresa } from '../entities/Empresa';

export class CreateEmpresaService {
  async execute(data: Partial<Empresa>): Promise<Empresa> {
    const empresaRepository = myDbSource.getRepository(Empresa);
    const empresa = empresaRepository.create(data);
    await empresaRepository.save(empresa);
    return empresa;
  }
}

export class GetAllEmpresasService {
  async execute(): Promise<Empresa[]> {
    return myDbSource.getRepository(Empresa).find();
  }
}

export class GetEmpresaByCodigoService {
  async execute(codigo: string): Promise<Empresa | null> {
    return myDbSource.getRepository(Empresa).findOneBy({ codigo });
  }
}

export class UpdateEmpresaService {
  async execute(codigo: string, data: Partial<Empresa>): Promise<Empresa | null> {
    const repo = myDbSource.getRepository(Empresa);
    const empresa = await repo.findOneBy({ codigo });
    if (!empresa) return null;
    Object.assign(empresa, data);
    await repo.save(empresa);
    return empresa;
  }
}

export class DeleteEmpresaService {
  async execute(codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Empresa);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}
