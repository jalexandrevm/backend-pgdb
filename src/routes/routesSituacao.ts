import { Router } from 'express';
import { CreateSituacaoController, GetAllSituacoesController, GetSituacaoByCodigoController, UpdateSituacaoController, DeleteSituacaoController } from '../database/controllers/SituacaoController';

const routesSituacao = Router();

routesSituacao.post('/situacoes', new CreateSituacaoController().handle);
routesSituacao.get('/situacoes', new GetAllSituacoesController().handle);
routesSituacao.get('/situacoes/:codigoStatus/:codigo', new GetSituacaoByCodigoController().handle);
routesSituacao.put('/situacoes/:codigoStatus/:codigo', new UpdateSituacaoController().handle);
routesSituacao.delete('/situacoes/:codigoStatus/:codigo', new DeleteSituacaoController().handle);

export { routesSituacao };
