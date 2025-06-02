import { CreateStatusService, GetAllStatusService, GetStatusByCodigoService, UpdateStatusService, DeleteStatusService } from '../services/StatusService';

export class CreateStatusController {
  async handle(req: any, res: any) {
    const required = ['codigo', 'nome', 'ordem', 'cor'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    const service = new CreateStatusService();
    const status = await service.execute(req.body);
    return res.status(201).json(status);
  }
}

export class GetAllStatusController {
  async handle(req: any, res: any) {
    const service = new GetAllStatusService();
    const status = await service.execute();
    return res.json(status);
  }
}

export class GetStatusByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetStatusByCodigoService();
    const status = await service.execute(codigo);
    if (!status) return res.status(404).json({ error: 'Status não encontrado' });
    return res.json(status);
  }
}

export class UpdateStatusController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new UpdateStatusService();
    const status = await service.execute(codigo, req.body);
    if (!status) return res.status(404).json({ error: 'Status não encontrado' });
    return res.json(status);
  }
}

export class DeleteStatusController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteStatusService();
    const ok = await service.execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Status não encontrado' });
    return res.status(204).send();
  }
}
