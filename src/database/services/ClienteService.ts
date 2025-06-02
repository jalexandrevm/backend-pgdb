import { myDbSource } from '../db-source';
import { Cliente } from '../entities/Cliente';

export class CreateClienteService {
  async execute(data: Partial<Cliente>): Promise<Cliente> {
    const clienteRepository = myDbSource.getRepository(Cliente);
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
