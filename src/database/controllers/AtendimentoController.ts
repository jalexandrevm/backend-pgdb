import { CreateAtendimentoService, GetAllAtendimentosService, GetAtendimentoByCodigoService, UpdateAtendimentoService, DeleteAtendimentoService, CreateAtendimentoInteracaoService, GetAllAtendimentoInteracoesService, GetAtendimentoInteracaoByCodigoService, DeleteAtendimentoInteracaoService, GetInteracoesByAtendimentoService, GetProdutosByAtendimentoService, UpdateAtendimentoInteracaoService, CreateAtendimentoProdutoService, GetAllAtendimentoProdutosService, GetAtendimentoProdutoByCodigoService, UpdateAtendimentoProdutoService, DeleteAtendimentoProdutoService } from '../services/AtendimentoService';

export class CreateAtendimentoController {
  async handle(req: any, res: any) {
    // Parâmetros obrigatórios
    const required = ['codigoEmpresa', 'codigoUsuario', 'codigoCliente', 'dataAbertura', 'codigoStatus', 'codigoSituacao', 'problemaInformado'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    const service = new CreateAtendimentoService();
    const atendimento = await service.execute(req.body);
    return res.status(201).json(atendimento);
  }
}

export class GetAllAtendimentosController {
  async handle(req: any, res: any) {
    const service = new GetAllAtendimentosService();
    const atendimentos = await service.execute();
    return res.json(atendimentos);
  }
}

export class GetAtendimentoByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetAtendimentoByCodigoService();
    const atendimento = await service.execute(codigo);
    if (!atendimento) return res.status(404).json({ error: 'Atendimento não encontrado' });
    return res.json(atendimento);
  }
}

export class UpdateAtendimentoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new UpdateAtendimentoService();
    const atendimento = await service.execute(codigo, req.body);
    if (!atendimento) return res.status(404).json({ error: 'Atendimento não encontrado' });
    return res.json(atendimento);
  }
}

export class DeleteAtendimentoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteAtendimentoService();
    const ok = await service.execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Atendimento não encontrado' });
    return res.status(204).send();
  }
}

// AtendimentoInteracao
export class CreateAtendimentoInteracaoController {
  async handle(req: any, res: any) {
    const required = ['codigoAtendimento', 'posicao', 'codigoTecnico', 'dataInteracao', 'codigoStatus', 'codigoSituacao', 'textoDescricao'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    try {
      const service = new CreateAtendimentoInteracaoService();
      const interacao = await service.execute(req.body);
      return res.status(201).json(interacao);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export class GetAllAtendimentoInteracoesController {
  async handle(req: any, res: any) {
    const service = new GetAllAtendimentoInteracoesService();
    const interacoes = await service.execute();
    return res.json(interacoes);
  }
}

export class GetAtendimentoInteracaoByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetAtendimentoInteracaoByCodigoService();
    const interacao = await service.execute(codigo);
    if (!interacao) return res.status(404).json({ error: 'Interação não encontrada' });
    return res.json(interacao);
  }
}

export class UpdateAtendimentoInteracaoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    if (req.body.codigo || req.body.codigoAtendimento) {
      return res.status(400).json({ error: 'Não é permitido atualizar o código ou códigoAtendimento da interação' });
    }
    const service = new UpdateAtendimentoInteracaoService();
    try {
      const interacao = await service.execute(codigo, req.body);
      if (!interacao) return res.status(404).json({ error: 'Interação não encontrada' });
      return res.json(interacao);
    } catch (err) {
      return res.status(400).json({ error: `Erro na atualização da interação: ${err.message}` });
    }
  }
}

export class DeleteAtendimentoInteracaoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteAtendimentoInteracaoService();
    const ok = await service.execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Interação não encontrada' });
    return res.status(204).send();
  }
}

export class GetInteracoesByAtendimentoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetInteracoesByAtendimentoService();
    const interacoes = await service.execute(codigo);
    return res.json(interacoes);
  }
}

export class GetProdutosByAtendimentoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetProdutosByAtendimentoService();
    const produtos = await service.execute(codigo);
    return res.json(produtos);
  }
}

// AtendimentoProduto
export class CreateAtendimentoProdutoController {
  async handle(req: any, res: any) {
    const required = ['codigoAtendimento', 'codigoUsuario', 'dataInclusao', 'tipoProduto', 'posicao', 'codigoProduto', 'qtd', 'unidade', 'vlrUnit', 'vlrTotal', 'vlrCusto'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    try {
      const service = new CreateAtendimentoProdutoService();
      const atendimentoProduto = await service.execute(req.body);
      return res.status(201).json(atendimentoProduto);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export class GetAllAtendimentoProdutosController {
  async handle(req: any, res: any) {
    const service = new GetAllAtendimentoProdutosService();
    const produtos = await service.execute();
    return res.json(produtos);
  }
}

export class GetAtendimentoProdutoByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetAtendimentoProdutoByCodigoService();
    const produto = await service.execute(codigo);
    if (!produto) return res.status(404).json({ error: 'Produto de atendimento não encontrado' });
    return res.json(produto);
  }
}

export class UpdateAtendimentoProdutoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    if (req.body.codigo || req.body.codigoAtendimento) {
      return res.status(400).json({ error: 'Não é permitido atualizar o código ou códigoAtendimento do produto' });
    }
    const service = new UpdateAtendimentoProdutoService();
    try {
      const produto = await service.execute(codigo, req.body);
      if (!produto) return res.status(404).json({ error: 'Produto de atendimento não encontrado' });
      return res.json(produto);
    } catch (err) {
      return res.status(400).json({ error: `Erro na atualização do produto: ${err.message}` });
    }
  }
}

export class DeleteAtendimentoProdutoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteAtendimentoProdutoService();
    const ok = await service.execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Produto de atendimento não encontrado' });
    return res.status(204).send();
  }
}
