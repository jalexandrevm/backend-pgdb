import { CreateProdutoService, GetAllProdutosService, GetProdutoByCodigoService, UpdateProdutoService, DeleteProdutoService } from '../services/ProdutoService';
import { CreateProdutoAuxiliarService, GetAllProdutoAuxiliaresService, GetProdutoAuxiliarByCodigoService, UpdateProdutoAuxiliarService, DeleteProdutoAuxiliarService } from '../services/ProdutoService';

export class CreateProdutoController {
  async handle(req: any, res: any) {
    const required = ['descricao', 'codigoSecao'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    const service = new CreateProdutoService();
    try {
      const produto = await service.execute(req.body);
      return res.status(201).json(produto);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export class GetAllProdutosController {
  async handle(req: any, res: any) {
    const service = new GetAllProdutosService();
    const produtos = await service.execute();
    return res.json(produtos);
  }
}

export class GetProdutoByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetProdutoByCodigoService();
    const produto = await service.execute(codigo);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    return res.json(produto);
  }
}

export class UpdateProdutoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new UpdateProdutoService();
    try {
      const produto = await service.execute(codigo, req.body);
      if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
      return res.json(produto);
    } catch (err) {
      return res.status(400).json({ error: `Erro na atualização do produto: ${err.message}` });
    }
  }
}

export class DeleteProdutoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteProdutoService();
    const ok = await service.execute(codigo.toString().padStart(14, '0'));
    if (!ok) return res.status(404).json({ error: 'Produto não encontrado' });
    return res.status(204).send();
  }
}

// Abaixo vamos incluir os controllers para a entidade ProdutoAuxiliar, que é uma entidade relacionada ao Produto.

export class CreateProdutoAuxiliarController {
  async handle(req: any, res: any) {
    const required = ['codigoAuxiliar', 'codigoProduto'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    const service = new CreateProdutoAuxiliarService();
    try {
      const produtoAuxiliar = await service.execute(req.body);
      return res.status(201).json(produtoAuxiliar);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export class GetAllProdutoAuxiliaresController {
  async handle(req: any, res: any) {
    const service = new GetAllProdutoAuxiliaresService();
    const produtoAuxiliares = await service.execute();
    return res.json(produtoAuxiliares);
  }
}

export class GetProdutoAuxiliarByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetProdutoAuxiliarByCodigoService();
    const produtoAuxiliar = await service.execute(codigo);
    if (!produtoAuxiliar) return res.status(404).json({ error: 'Produto auxiliar não encontrado' });
    return res.json(produtoAuxiliar);
  }
}

export class UpdateProdutoAuxiliarController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    if (req.body.codigoAuxiliar || req.body.codigoProduto) {
      return res.status(400).json({ error: 'Não é permitido atualizar os códigos de auxiliar ou produto' });
    }
    const service = new UpdateProdutoAuxiliarService();
    try {
      const produtoAuxiliar = await service.execute(codigo, req.body);
      if (!produtoAuxiliar) return res.status(404).json({ error: 'Produto auxiliar não encontrado' });
      return res.json(produtoAuxiliar);
    } catch (err) {
      return res.status(400).json({ error: `Erro ao atualizar produto auxiliar: ${err.message}` });
    }
  }
}

export class DeleteProdutoAuxiliarController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteProdutoAuxiliarService();
    const ok = await service.execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Produto auxiliar não encontrado' });
    return res.status(204).send();
  }
}
