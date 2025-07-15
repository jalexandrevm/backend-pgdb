import { CheckStringPositiveNumber } from '../../tools/UtilityFunctions';
import { myDbSource } from '../db-source';
import { Atendimento } from '../entities/Atendimento';
import { AtendimentoInteracao } from '../entities/AtendimentoInteracao';
import { Tecnico } from '../entities/Tecnico';
import { AtendimentoProduto } from '../entities/AtendimentoProduto';

export class CreateAtendimentoService {
  async execute(data: Partial<Atendimento>): Promise<Atendimento> {
    if (!data.codigo) {
      // Gera um novo código se não for fornecido
      const maxCodigoResult = await myDbSource.getRepository(Atendimento).find({
        select: ["codigo"],
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        data.codigo = "1".padStart(10, '0'); // Inicia com 1 se não houver atendimentos
      } else {
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(10, '0');
      }
    } else {
      // Verifica se o código é um número positivo
      if (!CheckStringPositiveNumber(data.codigo)) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(10, '0');
    }
    data.codigoEmpresa = data.codigoEmpresa?.toString().padStart(4, '0');
    data.codigoUsuario = data.codigoUsuario?.toString().padStart(6, '0');
    data.codigoCliente = data.codigoCliente?.toString().padStart(6, '0');
    data.codigoStatus = data.codigoStatus?.toString().padStart(3, '0');
    data.codigoSituacao = data.codigoSituacao?.toString().padStart(3, '0');
    console.log(data);
    const atendimentoRepository = myDbSource.getRepository(Atendimento);
    const atendimento = atendimentoRepository.create(data);
    await atendimentoRepository.save(atendimento);
    return atendimento;
  }
}

export class GetAllAtendimentosService {
  async execute(): Promise<Atendimento[]> {
    return myDbSource.getRepository(Atendimento).find({
      relations: ['empresa', 'usuario', 'cliente', 'status', 'situacao', 'interacaoTecnica', 'atendeProdutos']
    });
  }
}

export class GetAtendimentoByCodigoService {
  async execute(codigo: string): Promise<Atendimento | null> {
    codigo = codigo.toString().padStart(10, '0');
    return myDbSource.getRepository(Atendimento).findOne({ where: { codigo }, relations: ['empresa', 'usuario', 'cliente', 'status', 'situacao'] });
  }
}

export class UpdateAtendimentoService {
  async execute(codigo: string, data: Partial<Atendimento>): Promise<Atendimento | null> {
    codigo = codigo.toString().padStart(10, '0');
    const repo = myDbSource.getRepository(Atendimento);
    const atendimento = await repo.findOneBy({ codigo });
    if (!atendimento) return null;
    Object.assign(atendimento, data);
    await repo.save(atendimento);
    return atendimento;
  }
}

export class DeleteAtendimentoService {
  async execute(codigo: string): Promise<boolean> {
    codigo = codigo.toString().padStart(10, '0');
    const repo = myDbSource.getRepository(Atendimento);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}

// AtendimentoInteracao
export class CreateAtendimentoInteracaoService {
  async execute(data: Partial<AtendimentoInteracao>): Promise<AtendimentoInteracao> {
    // Verificando atendimento
    data.codigoAtendimento = data.codigoAtendimento?.toString().padStart(10, '0');
    data.codigoTecnico = data.codigoTecnico?.toString().padStart(6, '0');
    data.codigoStatus = data.codigoStatus?.toString().padStart(3, '0');
    data.codigoSituacao = data.codigoSituacao?.toString().padStart(3, '0');
    if (!data.codigo) {
      // Gera um novo código se não for fornecido
      const maxCodigoResult = await myDbSource.getRepository(AtendimentoInteracao).find({
        select: ["codigo"],
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        data.codigo = "1".padStart(10, '0'); // Inicia com 1 se não houver interações
      } else {
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(10, '0');
      }
    } else {
      // Verifica se o código é um número positivo
      if (!CheckStringPositiveNumber(data.codigo)) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(10, '0');
    }
    const atendimentoRepo = myDbSource.getRepository(Atendimento);
    const interacaoRepo = myDbSource.getRepository(AtendimentoInteracao);
    try {
      const atendimento = await atendimentoRepo.findOneBy({ codigo: data.codigoAtendimento });
      const interacao = interacaoRepo.create(data);
      await interacaoRepo.save(interacao);
      atendimento.codigoSituacao = data.codigoSituacao || atendimento.codigoSituacao;
      await atendimentoRepo.save(atendimento);
      return interacao;
    } catch (err) {
      throw new Error(`Erro ao criar interação: ${err.message}`);
    }
  }
}

export class GetAllAtendimentoInteracoesService {
  async execute(): Promise<AtendimentoInteracao[]> {
    return myDbSource.getRepository(AtendimentoInteracao).find();
  }
}

export class GetAtendimentoInteracaoByCodigoService {
  async execute(codigo: string): Promise<AtendimentoInteracao | null> {
    codigo = codigo.toString().padStart(10, '0');
    return myDbSource.getRepository(AtendimentoInteracao).findOneBy({ codigo });
  }
}

export class UpdateAtendimentoInteracaoService {
  async execute(codigo: string, data: Partial<AtendimentoInteracao>): Promise<AtendimentoInteracao | null> {
    codigo = codigo.toString().padStart(10, '0');
    const repo = myDbSource.getRepository(AtendimentoInteracao);
    const interacao = await repo.findOneBy({ codigo });
    if (!interacao) return null;
    Object.assign(interacao, data);
    await repo.save(interacao);
    return interacao;
  }
}

export class DeleteAtendimentoInteracaoService {
  async execute(codigo: string): Promise<boolean> {
    codigo = codigo.toString().padStart(10, '0');
    const repo = myDbSource.getRepository(AtendimentoInteracao);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}

export class GetInteracoesByAtendimentoService {
  async execute(codigoAtendimento: string): Promise<AtendimentoInteracao[]> {
    codigoAtendimento = codigoAtendimento.toString().padStart(10, '0');
    return myDbSource.getRepository(AtendimentoInteracao).find({ where: { codigoAtendimento } });
  }
}

export class GetProdutosByAtendimentoService {
  async execute(codigoAtendimento: string): Promise<any[]> {
    codigoAtendimento = codigoAtendimento.toString().padStart(10, '0');
    return myDbSource.getRepository('AtendimentoProduto').find({ where: { codigoAtendimento } });
  }
}

// AtendimentoProduto
export class CreateAtendimentoProdutoService {
  async execute(data: Partial<AtendimentoProduto>): Promise<AtendimentoProduto> {
    // Gera código sequencial se não fornecido
    if (!data.codigo) {
      const maxCodigoResult = await myDbSource.getRepository(AtendimentoProduto).find({
        select: ["codigo"],
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        data.codigo = "1".padStart(10, '0'); // Inicia com 1 se não houver produtos
      } else {
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(10, '0');
      }
    }
    // Padroniza campos
    data.codigoAtendimento = data.codigoAtendimento?.toString().padStart(10, '0');
    data.codigoUsuario = data.codigoUsuario?.toString().padStart(6, '0');
    data.codigoProduto = data.codigoProduto?.toString().padStart(6, '0');
    if (data.codigoAuxiliar)
      data.codigoAuxiliar = data.codigoAuxiliar?.toString();
    const repo = myDbSource.getRepository(AtendimentoProduto);
    const atendimentoProduto = repo.create(data);
    await repo.save(atendimentoProduto);
    return atendimentoProduto;
  }
}

export class GetAllAtendimentoProdutosService {
  async execute(): Promise<AtendimentoProduto[]> {
    return myDbSource.getRepository(AtendimentoProduto).find();
  }
}

export class GetAtendimentoProdutoByCodigoService {
  async execute(codigo: string): Promise<AtendimentoProduto | null> {
    codigo = codigo.toString().padStart(10, '0');
    return myDbSource.getRepository(AtendimentoProduto).findOneBy({ codigo });
  }
}

export class UpdateAtendimentoProdutoService {
  async execute(codigo: string, data: Partial<AtendimentoProduto>): Promise<AtendimentoProduto | null> {
    codigo = codigo.toString().padStart(10, '0');
    const repo = myDbSource.getRepository(AtendimentoProduto);
    const atendimentoProduto = await repo.findOneBy({ codigo });
    if (!atendimentoProduto) return null;
    Object.assign(atendimentoProduto, data);
    await repo.save(atendimentoProduto);
    return atendimentoProduto;
  }
}

export class DeleteAtendimentoProdutoService {
  async execute(codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(AtendimentoProduto);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}
