import { CreateTecnicoService, GetAllTecnicosService, GetTecnicoByCodigoService, UpdateTecnicoService, DeleteTecnicoService } from '../services/TecnicoService';

export class CreateTecnicoController {
  async handle(req: any, res: any) {
    const required = ['codigo', 'nome', 'email', 'titulo'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    const service = new CreateTecnicoService();
    const tecnico = await service.execute(req.body);
    return res.status(201).json(tecnico);
  }
}

export class GetAllTecnicosController {
  async handle(req: any, res: any) {
    const service = new GetAllTecnicosService();
    const tecnicos = await service.execute();
    return res.json(tecnicos);
  }
}

export class GetTecnicoByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetTecnicoByCodigoService();
    const tecnico = await service.execute(codigo);
    if (!tecnico) return res.status(404).json({ error: 'Técnico não encontrado' });
    return res.json(tecnico);
  }
}

export class UpdateTecnicoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new UpdateTecnicoService();
    const tecnico = await service.execute(codigo, req.body);
    if (!tecnico) return res.status(404).json({ error: 'Técnico não encontrado' });
    return res.json(tecnico);
  }
}

export class DeleteTecnicoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteTecnicoService();
    const ok = await service.execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Técnico não encontrado' });
    return res.status(204).send();
  }
}
