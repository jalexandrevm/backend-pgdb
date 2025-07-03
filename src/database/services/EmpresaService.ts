import { myDbSource } from '../db-source';
import { Empresa } from '../entities/Empresa';

export class CreateEmpresaService {
  async execute(data: Partial<Empresa>): Promise<Empresa> {
    const empresaRepository = myDbSource.getRepository(Empresa);
    console.log("Vamos criar uma nova empresa com os dados:", data);
    // Verifica se algum dos campos únicos já existe
    if (data.codigo) {
      const codigoNum = Number(data.codigo);
      if (isNaN(codigoNum) || codigoNum <= 0) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(4, '0');
      const exists = await empresaRepository.findOneBy({ codigo: data.codigo });
      if (exists) {
        throw new Error(`Já existe empresa com o campo 'codigo' = '${data.codigo}'`);
      }
    } else {
      const maxCodigoResult = await empresaRepository.find({
        select: ["codigo"],
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        console.log("No existing empresas found, starting with codigo 1.");
        data.codigo = "1".padStart(4, '0'); // Start with 1 if no empresas exist
      } else {
        console.log(`Max codigo found: ${JSON.stringify(maxCodigoResult)}`);
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(4, '0');
        console.log(`New codigo assigned: ${data.codigo}`);
      }
    }
    if (data.cnpj_cpf) {
      const exists = await empresaRepository.findOneBy({ cnpj_cpf: data.cnpj_cpf });
      if (exists) {
        throw new Error(`Já existe empresa com o campo 'cnpj_cpf' = '${data.cnpj_cpf}'`);
      }
    }
    if (data.ie_rg) {
      const exists = await empresaRepository.findOneBy({ ie_rg: data.ie_rg });
      if (exists) {
        throw new Error(`Já existe empresa com o campo 'ie_rg' = '${data.ie_rg}'`);
      }
    }
    if (data.razao_nome) {
      const exists = await empresaRepository.findOneBy({ razao_nome: data.razao_nome });
      if (exists) {
        throw new Error(`Já existe empresa com o campo 'razao_nome' = '${data.razao_nome}'`);
      }
    }
    if (data.email) {
      const exists = await empresaRepository.findOneBy({ email: data.email });
      if (exists) {
        throw new Error(`Já existe empresa com o campo 'email' = '${data.email}'`);
      }
    }
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
    if (data.codigo !== undefined) {
      throw new Error("Não é permitido alterar o campo 'codigo' da empresa.");
    };
    if (data.cnpj_cpf !== undefined) {
      throw new Error("Não é permitido alterar o campo 'cnpj_cpf' da empresa.");
    };
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
