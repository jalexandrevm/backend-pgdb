import { myDbSource } from '../db-source';
import { Cliente } from '../entities/Cliente';

export class CreateClienteService {
  async execute(data: Partial<Cliente>): Promise<Cliente> {
    const clienteRepository = myDbSource.getRepository(Cliente);
    if (data.codigo) {
      const codigoNum = Number(data.codigo);
      if (isNaN(codigoNum) || codigoNum <= 0) {
        throw new Error(`O código passado ('${data.codigo}') não representa um número válido maior que zero.`);
      }
      data.codigo = Number(data.codigo).toString().padStart(6, '0');
      const exists = await clienteRepository.findOneBy({ codigo: data.codigo });
      if (exists) {
        throw new Error(`Já existe cliente com o campo 'codigo' = '${data.codigo}'`);
      }
    } else {
      const maxCodigoResult = await clienteRepository.find({
        select: ["codigo"],
        order: { codigo: "DESC" },
        take: 1
      });
      if (maxCodigoResult.length === 0) {
        console.log("No existing clientes found, starting with codigo 1.");
        data.codigo = "1".padStart(6, '0');
      } else {
        data.codigo = (Number(maxCodigoResult[0].codigo) + 1).toString().padStart(6, '0');
      }
    }
    if (data.cnpj_cpf) {
      const exists = await clienteRepository.findOneBy({ cnpj_cpf: data.cnpj_cpf });
      if (exists) {
        throw new Error(`Já existe cliente com o campo 'cpfcnpj' = '${data.cnpj_cpf}'`);
      }
    }
    if (data.ie_rg) {
      const exists = await clienteRepository.findOneBy({ ie_rg: data.ie_rg });
      if (exists) {
        throw new Error(`Já existe cliente com o campo 'ierg' = '${data.ie_rg}'`);
      }
    }
    if (data.razao_nome) {
      const exists = await clienteRepository.findOneBy({ razao_nome: data.razao_nome });
      if (exists) {
        throw new Error(`Já existe cliente com o campo 'nome' = '${data.razao_nome}'`);
      }
    }
    if (data.email) {
      const exists = await clienteRepository.findOneBy({ email: data.email });
      if (exists) {
        throw new Error(`Já existe cliente com o campo 'email' = '${data.email}'`);
      }
    }
    const cliente = clienteRepository.create(data);
    await clienteRepository.save(cliente);
    return cliente;
  }
}

export class GetAllClientesService {
  async execute(): Promise<Cliente[]> {
    return myDbSource.getRepository(Cliente).find();
  }
}

export class GetClienteByCodigoService {
  async execute(codigo: string): Promise<Cliente | null> {
    return myDbSource.getRepository(Cliente).findOneBy({ codigo });
  }
}

export class UpdateClienteService {
  async execute(codigo: string, data: Partial<Cliente>): Promise<Cliente | null> {
    if (data.codigo !== undefined) {
      throw new Error("Não é permitido alterar o campo 'codigo' do cliente.");
    }
    if (data.cnpj_cpf !== undefined) {
      throw new Error("Não é permitido alterar o campo 'cnpj_cpf' do cliente.");
    }
    const repo = myDbSource.getRepository(Cliente);
    const cliente = await repo.findOneBy({ codigo });
    if (!cliente) return null;
    Object.assign(cliente, data);
    await repo.save(cliente);
    return cliente;
  }
}

export class DeleteClienteService {
  async execute(codigo: string): Promise<boolean> {
    const repo = myDbSource.getRepository(Cliente);
    const result = await repo.delete({ codigo });
    return result.affected !== 0;
  }
}
