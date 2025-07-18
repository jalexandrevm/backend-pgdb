import { CreateClienteService, GetAllClientesService, GetClienteByCodigoService, UpdateClienteService, DeleteClienteService } from '../services/ClienteService';

export class CreateClienteController {
  async handle(req: any, res: any) {
    const required = [
      'cnpj_cpf', 'ie_rg', 'razao_nome', 'fantasia_apelido', 'cep', 'pais', 'uf', 'cidade', 'logradouro', 'numero', 'bairro', 'complemento', 'fone1', 'fone2', 'email', 'sexo'
    ];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    try {
      const service = new CreateClienteService();
      const cliente = await service.execute(req.body);
      return res.status(201).json(cliente);
    } catch (err) {
      console.error('Erro ao criar cliente:', err);
      return res.status(500).json({ error: `Erro ao criar. ${err.message}` });
    }
  }
}

export class GetAllClientesController {
  async handle(req: any, res: any) {
    const service = new GetAllClientesService();
    const clientes = await service.execute();
    return res.json(clientes);
  }
}

export class GetClienteByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetClienteByCodigoService();
    const cliente = await service.execute(codigo);
    if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
    return res.json(cliente);
  }
}

export class UpdateClienteController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new UpdateClienteService();
    try {
      const cliente = await service.execute(codigo, req.body);
      if (!cliente) return res.status(404).json({ error: 'Cliente não encontrado' });
      return res.json(cliente);
    } catch (err) {
      return res.status(500).json({ error: `Erro ao atualizar cliente: ${err.message}` });
    }
  }
}

export class DeleteClienteController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteClienteService();
    const ok = await service.execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Cliente não encontrado' });
    return res.status(204).send();
  }
}
