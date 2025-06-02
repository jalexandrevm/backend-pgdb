import { CreateProdutoService, GetAllProdutosService, GetProdutoByCodigoService, UpdateProdutoService, DeleteProdutoService } from '../services/ProdutoService';

export class CreateProdutoController {
  async handle(req: any, res: any) {
    const required = ['codigo', 'descricao', 'preco'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    const service = new CreateProdutoService();
    const produto = await service.execute(req.body);
    return res.status(201).json(produto);
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
    const produto = await service.execute(codigo, req.body);
    if (!produto) return res.status(404).json({ error: 'Produto não encontrado' });
    return res.json(produto);
  }
}

export class DeleteProdutoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteProdutoService();
    const ok = await service.execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Produto não encontrado' });
    return res.status(204).send();
  }
}
