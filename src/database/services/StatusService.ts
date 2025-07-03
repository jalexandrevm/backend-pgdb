import { myDbSource } from '../db-source';
import { Status } from '../entities/Status';

export class CreateStatusService {
  async execute(data: Partial<Status>): Promise<Status> {
    // Verifica se os dados enviados para criar o status são válidos
    const statusRepository = myDbSource.getRepository(Status);
    if (data.codigo) {
      const codigoNum = Number(data.codigo);
      if (isNaN(codigoNum) || codigoNum <= 0) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(3, '0');
      const exists = await statusRepository.findOneBy({ codigo: data.codigo });
      if (exists) {
        throw new Error(`Já existe status com o campo 'codigo' = '${data.codigo}'`);
      }
    } else {
      const maxCodigoResult = await statusRepository.find({
        select: ["codigo"],
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        console.log("No existing statuses found, starting with codigo 1.");
        data.codigo = "1".padStart(3, '0'); // Start with 1 if no statuses exist
      } else {
        console.log(`Max codigo found: ${JSON.stringify(maxCodigoResult)}`);
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(3, '0');
        console.log(`New codigo assigned: ${data.codigo}`);
      }
    }
    if (data.nome) {
      const exists = await statusRepository.findOneBy({ nome: data.nome });
      if (exists) {
        throw new Error(`Já existe status com o campo 'nome' = '${data.nome}'`);
      }
    };
    const status = statusRepository.create(data);
    await statusRepository.save(status);
    return status;
  }
}

export class GetAllStatusService {
  async execute(): Promise<Status[]> {
    return myDbSource.getRepository(Status).find();
  }
}

export class GetStatusByCodigoService {
  async execute(codigo: string): Promise<Status | null> {
    codigo = codigo.toString().padStart(3, '0');
    return myDbSource.getRepository(Status).findOneBy({ codigo });
  }
}

export class UpdateStatusService {
  async execute(codigo: string, data: Partial<Status>): Promise<Status | null> {
    if (data.codigo !== undefined) {
      throw new Error("Não é permitido alterar o campo 'codigo' do status.");
    };
    codigo = codigo.toString().padStart(3, '0');
    const repo = myDbSource.getRepository(Status);
    const status = await repo.findOneBy({ codigo });
    if (!status) return null;
    Object.assign(status, data);
    await repo.save(status);
    return status;
  }
}

export class DeleteStatusService {
  async execute(codigo: string): Promise<boolean> {
    codigo = codigo.toString().padStart(3, '0');
    const repo = myDbSource.getRepository(Status);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}
