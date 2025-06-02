import { myDbSource } from '../db-source';
import { Situacao } from '../entities/Situacao';

export class CreateSituacaoService {
  async execute(data: Partial<Situacao>): Promise<Situacao> {
    const situacaoRepository = myDbSource.getRepository(Situacao);
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
  async execute(codigo: string): Promise<Situacao | null> {
    return myDbSource.getRepository(Situacao).findOne({ where: { codigo }, relations: ['status'] });
  }
}

export class UpdateSituacaoService {
  async execute(codigo: string, data: Partial<Situacao>): Promise<Situacao | null> {
    const repo = myDbSource.getRepository(Situacao);
    const situacao = await repo.findOneBy({ codigo });
    if (!situacao) return null;
    Object.assign(situacao, data);
    await repo.save(situacao);
    return situacao;
  }
}

export class DeleteSituacaoService {
  async execute(codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Situacao);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}
