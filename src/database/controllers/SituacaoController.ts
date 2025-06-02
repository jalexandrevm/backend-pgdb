import { CreateSituacaoService, GetAllSituacoesService, GetSituacaoByCodigoService, UpdateSituacaoService, DeleteSituacaoService } from '../services/SituacaoService';

export class CreateSituacaoController {
  async handle(req: any, res: any) {
    const required = ['codigo', 'nome', 'ordem', 'status_codigo', 'cor'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    const service = new CreateSituacaoService();
    const situacao = await service.execute(req.body);
    return res.status(201).json(situacao);
  }
}

export class GetAllSituacoesController {
  async handle(req: any, res: any) {
    const service = new GetAllSituacoesService();
    const situacoes = await service.execute();
    return res.json(situacoes);
  }
}

export class GetSituacaoByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetSituacaoByCodigoService();
    const situacao = await service.execute(codigo);
    if (!situacao) return res.status(404).json({ error: 'Situação não encontrada' });
    return res.json(situacao);
  }
}

export class UpdateSituacaoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new UpdateSituacaoService();
    const situacao = await service.execute(codigo, req.body);
    if (!situacao) return res.status(404).json({ error: 'Situação não encontrada' });
    return res.json(situacao);
  }
}

export class DeleteSituacaoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteSituacaoService();
    const ok = await service.execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Situação não encontrada' });
    return res.status(204).send();
  }
}
