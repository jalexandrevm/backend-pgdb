import { CheckStringPositiveNumber } from '../../tools/UtilityFunctions';
import { myDbSource } from '../db-source';
import { Produto } from '../entities/Produto';
import { ProdutoAuxiliar } from '../entities/ProdutoAuxiliar';
import { Secao } from '../entities/Secao';

export class CreateProdutoService {
  async execute(data: Partial<Produto>): Promise<Produto> {
    // Validação: Secao obrigatória
    if (!data.codigoSecao) {
      throw new Error('O campo codigoSecao é obrigatório.');
    }
    // Verifica se existe pelo menos uma Secao cadastrada
    const secaoRepository = myDbSource.getRepository(Secao);
    const secao = await secaoRepository.findOneBy({ codigo: data.codigoSecao });
    if (!secao) {
      throw new Error('A seção informada não existe. Cadastre uma seção válida antes de criar o produto.');
    }
    // Departamento e SubDepartamento são opcionais
    if (data.codigo) {
      const codigoNum = Number(data.codigo);
      if (isNaN(codigoNum) || codigoNum <= 0) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(14, '0');
      const exists = await myDbSource.getRepository(Produto).findOneBy({ codigo: data.codigo });
      if (exists) {
        throw new Error(`Já existe produto com o campo 'codigo' = '${data.codigo}'`);
      }
    } else {
      const maxCodigoResult = await myDbSource.getRepository(Produto).find({
        select: ["codigo"],
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        console.log("No existing produtos found, starting with codigo 1.");
        data.codigo = "1".padStart(14, '0'); // Start with 1 if no produtos exist
      } else {
        console.log(`Max codigo found: ${JSON.stringify(maxCodigoResult)}`);
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(14, '0');
        console.log(`New codigo assigned: ${data.codigo}`);
      }
    }
    const produtoRepository = myDbSource.getRepository(Produto);
    const produto = produtoRepository.create(data);
    await produtoRepository.save(produto);
    return produto;
  }
}

export class GetAllProdutosService {
  async execute(): Promise<Produto[]> {
    return myDbSource.getRepository(Produto).find({ relations: ['secao', 'departamento', 'subDepartamento'] });
  }
}

export class GetProdutoByCodigoService {
  async execute(codigo: string): Promise<Produto | null> {
    codigo = codigo.toString().padStart(14, '0');
    return myDbSource.getRepository(Produto).findOneBy({ codigo });
  }
}

export class UpdateProdutoService {
  async execute(codigo: string, data: Partial<Produto>): Promise<Produto | null> {
    codigo = codigo.toString().padStart(14, '0');
    const repo = myDbSource.getRepository(Produto);
    try {
      const produto = await repo.findOneBy({ codigo });
      if (!produto) return null;
      Object.assign(produto, data);
      await repo.save(produto);
      return produto;
    } catch (err) {
      throw new Error(`Erro ao atualizar produto: ${err.message}`);
    }
  }
}

export class DeleteProdutoService {
  async execute(codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Produto);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}

// Abaixo vamos incluir os controllers para a entidade ProdutoAuxiliar, que é uma entidade relacionada ao Produto.
export class CreateProdutoAuxiliarService {
  async execute(data: Partial<ProdutoAuxiliar>): Promise<ProdutoAuxiliar> {
    // Verifica se o produto existe
    if (!CheckStringPositiveNumber(data.codigoProduto)) {
      throw new Error(`O código do produto passado ('${data.codigoProduto}') não representa um número válido maior que zero.`);
    }
    data.codigoProduto = data.codigoProduto?.toString().padStart(14, '0');
    const produtoRepository = myDbSource.getRepository(Produto);
    const produtoExist = await produtoRepository.findOneBy({ codigo: data.codigoProduto });
    if (!produtoExist) {
      throw new Error('O produto informado não existe. Cadastre um produto válido antes de criar o auxiliar.');
    }
    // Verifica se o código auxiliar é válido
    if (!CheckStringPositiveNumber(data.codigoAuxiliar)) {
      throw new Error(`O código auxiliar passado ('${data.codigoAuxiliar}') não representa um número válido maior que zero.`);
    }
    data.codigoAuxiliar = Number(data.codigoAuxiliar).toString().padStart(20, '0');
    // Criação do ProdutoAuxiliar
    const produtoAuxiliarRepository = myDbSource.getRepository(ProdutoAuxiliar);
    const produtoAuxiliar = produtoAuxiliarRepository.create(data);
    await produtoAuxiliarRepository.save(produtoAuxiliar);
    return produtoAuxiliar;
  }
}

export class GetAllProdutoAuxiliaresService {
  async execute(): Promise<ProdutoAuxiliar[]> {
    return myDbSource.getRepository(ProdutoAuxiliar).find({ relations: ['produto'] });
  }
}

export class GetProdutoAuxiliarByCodigoService {
  async execute(codigo: string): Promise<ProdutoAuxiliar | null> {
    return myDbSource.getRepository(ProdutoAuxiliar).findOneBy({ codigoAuxiliar: codigo.toString().padStart(20, '0') });
  }
}

export class UpdateProdutoAuxiliarService {
  async execute(codigo: string, data: Partial<ProdutoAuxiliar>): Promise<ProdutoAuxiliar | null> {
    const repo = myDbSource.getRepository(ProdutoAuxiliar);
    const produtoAuxiliar = await repo.findOneBy({ codigoAuxiliar: codigo.toString().padStart(20, '0') });
    if (!produtoAuxiliar) return null;
    Object.assign(produtoAuxiliar, data);
    await repo.save(produtoAuxiliar);
    return produtoAuxiliar;
  }
}

export class DeleteProdutoAuxiliarService {
  async execute(codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(ProdutoAuxiliar);
    const result = await repo.delete({ codigoAuxiliar: codigo.toString().padStart(20, '0') });
    return result.affected !== 0;
  }
}
