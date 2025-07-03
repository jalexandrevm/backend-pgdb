import { myDbSource } from '../db-source';
import { Situacao } from '../entities/Situacao';
import { Status } from '../entities/Status';

export class CreateSituacaoService {
  async execute(data: Partial<Situacao>): Promise<Situacao> {
    // Verifica se o status com o código fornecido existe
    data.codigoStatus = data.codigoStatus?.toString().padStart(3, '0');
    const statusExists = await myDbSource.getRepository(Status).findOneBy({ codigo: data.codigoStatus });
    if (!statusExists) {
      throw new Error(`Status com código '${data.codigoStatus}' não encontrado.`);
    }

    // Verifica os dados enviados para criar a situação são válidos
    const situacaoRepository = myDbSource.getRepository(Situacao);
    if (data.codigo) {
      const codigoNum = Number(data.codigo);
      if (isNaN(codigoNum) || codigoNum <= 0) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(3, '0');
      const exists = await situacaoRepository.findOneBy({ codigo: data.codigo });
      if (exists) {
        throw new Error(`Já existe situação com o campo 'codigo' = '${data.codigo}'`);
      }
    } else {
      const maxCodigoResult = await situacaoRepository.find({
        select: ["codigo"],
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        console.log("No existing situações found, starting with codigo 1.");
        data.codigo = "1".padStart(3, '0'); // Start with 1 if no situações exist
      } else {
        console.log(`Max codigo found: ${JSON.stringify(maxCodigoResult)}`);
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(3, '0');
        console.log(`New codigo assigned: ${data.codigo}`);
      }
    }
    if (data.nome) {
      const exists = await situacaoRepository.findOneBy({ nome: data.nome });
      if (exists) {
        throw new Error(`Já existe situação com o campo 'nome' = '${data.nome}'`);
      }
    }
    const situacao = situacaoRepository.create(data);
    await situacaoRepository.save(situacao);
    return situacao;
  }
}

export class GetAllSituacoesService {
  async execute(): Promise<Situacao[]> {
    return myDbSource.getRepository(Situacao).find({ relations: ['status'] });
  }
}

export class GetSituacaoByCodigoService {
  async execute(codigoStatus: string, codigo: string): Promise<Situacao | null> {
    codigoStatus = codigoStatus.toString().padStart(3, '0');
    codigo = codigo.toString().padStart(3, '0');
    return myDbSource.getRepository(Situacao).findOne({ where: { codigoStatus, codigo }, relations: ['status'] });
  }
}

export class UpdateSituacaoService {
  async execute(codigoStatus: string, codigo: string, data: Partial<Situacao>): Promise<Situacao | null> {
    if (data.codigo !== undefined || data.codigoStatus !== undefined) {
      throw new Error("Não é permitido alterar o campo 'codigoStatus' ou 'codigo' da situação.");
    }
    const repo = myDbSource.getRepository(Situacao);
    codigoStatus = codigoStatus.toString().padStart(3, '0');
    codigo = codigo.toString().padStart(3, '0');
    const situacao = await repo.findOneBy({ codigoStatus, codigo });
    if (!situacao) return null;
    Object.assign(situacao, data);
    await repo.save(situacao);
    return situacao;
  }
}

export class DeleteSituacaoService {
  async execute(codigoStatus: string, codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Situacao);
    codigoStatus = codigoStatus.toString().padStart(3, '0');
    codigo = codigo.toString().padStart(3, '0');
    const result = await repo.delete({ codigoStatus, codigo });
    return result.affected !== 0;
  }
}
