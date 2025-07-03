import { myDbSource } from '../db-source';
import { Secao } from '../entities/Secao';
import { Departamento } from '../entities/Departamento';
import { SubDepartamento } from '../entities/SubDepartamento';

// Secao Services
export class CreateSecaoService {
  async execute(data: Partial<Secao>): Promise<Secao> {
    const repo = myDbSource.getRepository(Secao);
    if (data.codigo) {
      const codigoNum = Number(data.codigo);
      if (isNaN(codigoNum) || codigoNum <= 0) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(2, '0');
      const exists = await repo.findOneBy({ codigo: data.codigo });
      if (exists) {
        throw new Error(`Já existe seção com o campo 'codigo' = '${data.codigo}'`);
      }
    } else {
      const maxCodigoResult = await repo.find({
        select: ["codigo"],
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        console.log("No existing seções found, starting with codigo 1.");
        data.codigo = "01"; // Start with 1 if no seções exist
      } else {
        console.log(`Max codigo found: ${JSON.stringify(maxCodigoResult)}`);
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(2, '0');
        console.log(`New codigo assigned: ${data.codigo}`);
      }
    }
    if (data.descricao) {
      const exists = await repo.findOneBy({ descricao: data.descricao });
      if (exists) {
        throw new Error(`Já existe seção com a descrição '${data.descricao}'`);
      }
    }
    const secao = repo.create(data);
    await repo.save(secao);
    return secao;
  }
}

export class GetAllSecoesService {
  async execute(): Promise<Secao[]> {
    return myDbSource.getRepository(Secao).find();
  }
}

export class GetSecaoByCodigoService {
  async execute(codigo: string): Promise<Secao | null> {
    codigo = codigo.toString().padStart(2, '0');
    return myDbSource.getRepository(Secao).findOneBy({ codigo });
  }
}

export class UpdateSecaoService {
  async execute(codigo: string, data: Partial<Secao>): Promise<Secao | null> {
    if (data.codigo !== undefined) {
      throw new Error("Não é permitido alterar o campo 'codigo' da seção.");
    }
    const repo = myDbSource.getRepository(Secao);
    codigo = codigo.toString().padStart(2, '0');
    if (data.descricao) {
      const exists = await repo.findOneBy({ descricao: data.descricao });
      if (exists) {
        throw new Error(`Já existe seção com a descrição '${data.descricao}'`);
      }
    }
    const secao = await repo.findOneBy({ codigo });
    if (!secao) return null;
    Object.assign(secao, data);
    await repo.save(secao);
    return secao;
  }
}

export class DeleteSecaoService {
  async execute(codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Secao);
    codigo = codigo.toString().padStart(2, '0');
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}

// Departamento Services
export class CreateDepartamentoService {
  async execute(data: Partial<Departamento>): Promise<Departamento> {
    data.codigoSecaoDep = data.codigoSecaoDep.toString().padStart(2, '0');
    const secaoExists = await myDbSource.getRepository(Secao).findOneBy({ codigo: data.codigoSecaoDep });
    if (!secaoExists) {
      throw new Error(`Seção com código '${data.codigoSecaoDep}' não existe.`);
    }

    const repo = myDbSource.getRepository(Departamento);
    if (data.codigo) {
      const codigoNum = Number(data.codigo);
      if (isNaN(codigoNum) || codigoNum <= 0) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(3, '0');
      if (await repo.findOneBy({ codigoSecaoDep: data.codigoSecaoDep, codigo: data.codigo })) {
        throw new Error('Já existe um departamento com esse código nesta seção.');
      }
    } else {
      const maxCodigoResult = await repo.find({
        select: ["codigo"],
        where: { codigoSecaoDep: data.codigoSecaoDep },
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        console.log("No existing departamentos found, starting with codigo 1.");
        data.codigo = "001"; // Start with 1 if no departamentos exist
      } else {
        console.log(`Max codigo found: ${JSON.stringify(maxCodigoResult)}`);
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(3, '0');
        console.log(`New codigo assigned: ${data.codigo}`);
      }
    }
    const departamento = repo.create(data);
    await repo.save(departamento);
    return departamento;
  }
}

export class GetAllDepartamentosService {
  async execute(): Promise<Departamento[]> {
    return myDbSource.getRepository(Departamento).find({ relations: ['secao'] });
  }
}

export class GetDepartamentoByIdService {
  async execute(codigoSecaoDep: string, codigo: string): Promise<Departamento | null> {
    codigoSecaoDep = codigoSecaoDep.toString().padStart(2, '0');
    codigo = codigo.toString().padStart(3, '0');
    return myDbSource.getRepository(Departamento).findOne({ where: { codigoSecaoDep, codigo }, relations: ['secao'] });
  }
}

export class UpdateDepartamentoService {
  async execute(codigoSecaoDep: string, codigo: string, data: Partial<Departamento>): Promise<Departamento | null> {
    if (data.codigo !== undefined || data.codigoSecaoDep !== undefined) {
      throw new Error("Não é permitido alterar os campos 'codigo' ou 'codigoSecaoDep' do departamento.");
    }
    const repo = myDbSource.getRepository(Departamento);
    codigoSecaoDep = codigoSecaoDep.toString().padStart(2, '0');
    codigo = codigo.toString().padStart(3, '0');
    const departamento = await repo.findOneBy({ codigoSecaoDep, codigo });
    if (!departamento) return null;
    Object.assign(departamento, data);
    await repo.save(departamento);
    return departamento;
  }
}

export class DeleteDepartamentoService {
  async execute(codigoSecaoDep: string, codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Departamento);
    codigoSecaoDep = codigoSecaoDep.toString().padStart(2, '0');
    codigo = codigo.toString().padStart(3, '0');
    const result = await repo.delete({ codigoSecaoDep, codigo });
    return result.affected !== 0;
  }
}

// SubDepartamento Services
export class CreateSubDepartamentoService {
  async execute(data: Partial<SubDepartamento>): Promise<SubDepartamento> {
    data.codigoSecaoSubD = data.codigoSecaoSubD.toString().padStart(2, '0');
    data.codigoDepartamentoSubD = data.codigoDepartamentoSubD.toString().padStart(3, '0');
    const secaoExists = await myDbSource.getRepository(Secao).findOneBy({ codigo: data.codigoSecaoSubD });
    if (!secaoExists) {
      throw new Error(`Seção com código '${data.codigoSecaoSubD}' não existe.`);
    }
    const departamentoExists = await myDbSource.getRepository(Departamento).findOneBy({
      codigoSecaoDep: data.codigoSecaoSubD,
      codigo: data.codigoDepartamentoSubD
    });
    if (!departamentoExists) {
      throw new Error(`Departamento com código '${data.codigoDepartamentoSubD}' na seção '${data.codigoSecaoSubD}' não existe.`);
    }
    const repo = myDbSource.getRepository(SubDepartamento);
    if (data.codigo) {
      const codigoNum = Number(data.codigo);
      if (isNaN(codigoNum) || codigoNum <= 0) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(3, '0');
      if (await repo.findOneBy({ codigoSecaoSubD: data.codigoSecaoSubD, codigoDepartamentoSubD: data.codigoDepartamentoSubD, codigo: data.codigo })) {
        throw new Error('Já existe um subdepartamento com esse código neste departamento.');
      }
    } else {
      const maxCodigoResult = await repo.find({
        select: ["codigo"],
        where: { codigoSecaoSubD: data.codigoSecaoSubD, codigoDepartamentoSubD: data.codigoDepartamentoSubD },
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        console.log("No existing subdepartamentos found, starting with codigo 1.");
        data.codigo = "001"; // Start with 1 if no subdepartamentos exist
      } else {
        console.log(`Max codigo found: ${JSON.stringify(maxCodigoResult)}`);
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(3, '0');
        console.log(`New codigo assigned: ${data.codigo}`);
      }
    }
    const subdepartamento = repo.create(data);
    await repo.save(subdepartamento);
    return subdepartamento;
  }
}

export class GetAllSubDepartamentosService {
  async execute(): Promise<SubDepartamento[]> {
    return myDbSource.getRepository(SubDepartamento).find({
      relations: ['secao', 'departamento'],
      order: {
        codigoSecaoSubD: 'ASC',
        codigoDepartamentoSubD: 'ASC',
        codigo: 'ASC'
      }
    });
  }
}

export class GetSubDepartamentoByIdService {
  async execute(codigoSecaoSubD: string, codigoDepartamentoSubD: string, codigo: string): Promise<SubDepartamento | null> {
    codigoSecaoSubD = codigoSecaoSubD.toString().padStart(2, '0');
    codigoDepartamentoSubD = codigoDepartamentoSubD.toString().padStart(3, '0');
    codigo = codigo.toString().padStart(3, '0');
    return myDbSource.getRepository(SubDepartamento).findOne({ where: { codigoSecaoSubD, codigoDepartamentoSubD, codigo }, relations: ['departamento', 'secao'] });
  }
}

export class UpdateSubDepartamentoService {
  async execute(codigoSecaoSubD: string, codigoDepartamentoSubD: string, codigo: string, data: Partial<SubDepartamento>): Promise<SubDepartamento | null> {
    if (data.codigo !== undefined || data.codigoSecaoSubD !== undefined || data.codigoDepartamentoSubD !== undefined) {
      throw new Error("Não é permitido alterar os campos 'codigo', 'codigoSecaoSubD' ou 'codigoDepartamentoSubD' do subdepartamento.");
    }
    const repo = myDbSource.getRepository(SubDepartamento);
    codigoSecaoSubD = codigoSecaoSubD.toString().padStart(2, '0');
    codigoDepartamentoSubD = codigoDepartamentoSubD.toString().padStart(3, '  0');
    codigo = codigo.toString().padStart(3, '0');
    const subdepartamento = await repo.findOneBy({ codigoSecaoSubD, codigoDepartamentoSubD, codigo });
    if (!subdepartamento) return null;
    Object.assign(subdepartamento, data);
    await repo.save(subdepartamento);
    return subdepartamento;
  }
}

export class DeleteSubDepartamentoService {
  async execute(codigoSecaoSubD: string, codigoDepartamentoSubD: string, codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(SubDepartamento);
    codigoSecaoSubD = codigoSecaoSubD.toString().padStart(2, '0');
    codigoDepartamentoSubD = codigoDepartamentoSubD.toString().padStart(3, '0');
    codigo = codigo.toString().padStart(3, '0');
    const result = await repo.delete({ codigoSecaoSubD, codigoDepartamentoSubD, codigo });
    return result.affected !== 0;
  }
}
