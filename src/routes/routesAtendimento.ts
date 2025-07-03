import { Router } from 'express';
import {
  CreateAtendimentoController,
  GetAllAtendimentosController,
  GetAtendimentoByCodigoController,
  UpdateAtendimentoController,
  DeleteAtendimentoController,
  CreateAtendimentoInteracaoController,
  GetAllAtendimentoInteracoesController,
  GetAtendimentoInteracaoByCodigoController,
  DeleteAtendimentoInteracaoController,
  GetInteracoesByAtendimentoController,
  GetProdutosByAtendimentoController,
  UpdateAtendimentoInteracaoController
} from '../database/controllers/AtendimentoController';

const routesAtendimento = Router();

// Atendimento
routesAtendimento.post('/atendimentos', new CreateAtendimentoController().handle);
routesAtendimento.get('/atendimentos', new GetAllAtendimentosController().handle);
routesAtendimento.get('/atendimentos/:codigo', new GetAtendimentoByCodigoController().handle);
routesAtendimento.put('/atendimentos/:codigo', new UpdateAtendimentoController().handle);
routesAtendimento.delete('/atendimentos/:codigo', new DeleteAtendimentoController().handle);

// AtendimentoInteracao
routesAtendimento.post('/atendimento-interacoes', new CreateAtendimentoInteracaoController().handle);
routesAtendimento.get('/atendimento-interacoes', new GetAllAtendimentoInteracoesController().handle);
routesAtendimento.get('/atendimento-interacoes/:codigo', new GetAtendimentoInteracaoByCodigoController().handle);
routesAtendimento.put('/atendimento-interacoes/:codigo', new UpdateAtendimentoInteracaoController().handle); // Assuming this is for updating interações
routesAtendimento.delete('/atendimento-interacoes/:codigo', new DeleteAtendimentoInteracaoController().handle);

// Rotas para buscar interações e produtos de um atendimento específico
routesAtendimento.get('/atendimentos/:codigo/interacoes', new GetInteracoesByAtendimentoController().handle);
routesAtendimento.get('/atendimentos/:codigo/produtos', new GetProdutosByAtendimentoController().handle);

export { routesAtendimento };
