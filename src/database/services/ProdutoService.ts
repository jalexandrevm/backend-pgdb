import { myDbSource } from '../db-source';
import { Produto } from '../entities/Produto';

export class CreateProdutoService {
  async execute(data: Partial<Produto>): Promise<Produto> {
    const produtoRepository = myDbSource.getRepository(Produto);
    const produto = produtoRepository.create(data);
    await produtoRepository.save(produto);
    return produto;
  }
}

export class GetAllProdutosService {
  async execute(): Promise<Produto[]> {
    return myDbSource.getRepository(Produto).find();
  }
}

export class GetProdutoByCodigoService {
  async execute(codigo: string): Promise<Produto | null> {
    return myDbSource.getRepository(Produto).findOneBy({ codigo });
  }
}

export class UpdateProdutoService {
  async execute(codigo: string, data: Partial<Produto>): Promise<Produto | null> {
    const repo = myDbSource.getRepository(Produto);
    const produto = await repo.findOneBy({ codigo });
    if (!produto) return null;
    Object.assign(produto, data);
    await repo.save(produto);
    return produto;
  }
}

export class DeleteProdutoService {
  async execute(codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Produto);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}
