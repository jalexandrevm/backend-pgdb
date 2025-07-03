import { CreateSituacaoService, GetAllSituacoesService, GetSituacaoByCodigoService, UpdateSituacaoService, DeleteSituacaoService } from '../services/SituacaoService';

export class CreateSituacaoController {
  async handle(req: any, res: any) {
    const required = ['nome', 'ordem', 'codigoStatus', 'cor'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    const service = new CreateSituacaoService();
    try {
      const situacao = await service.execute(req.body);
      return res.status(201).json(situacao);
    } catch (err) {
      return res.status(500).json({ error: `Erro ao criar situação: ${err.message}` });
    }
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
    const { codigoStatus, codigo } = req.params;
    if (!codigoStatus || !codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigoStatus e codigo' });
    const service = new GetSituacaoByCodigoService();
    const situacao = await service.execute(codigoStatus, codigo);
    if (!situacao) return res.status(404).json({ error: 'Situação não encontrada' });
    return res.json(situacao);
  }
}

export class UpdateSituacaoController {
  async handle(req: any, res: any) {
    const { codigoStatus, codigo } = req.params;
    if (!codigoStatus || !codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigoStatus e codigo' });
    const service = new UpdateSituacaoService();
    const situacao = await service.execute(codigoStatus, codigo, req.body);
    if (!situacao) return res.status(404).json({ error: 'Situação não encontrada' });
    return res.json(situacao);
  }
}

export class DeleteSituacaoController {
  async handle(req: any, res: any) {
    const { codigoStatus, codigo } = req.params;
    if (!codigoStatus || !codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigoStatus e codigo' });
    const service = new DeleteSituacaoService();
    const ok = await service.execute(codigoStatus, codigo);
    if (!ok) return res.status(404).json({ error: 'Situação não encontrada' });
    return res.status(204).send();
  }
}
