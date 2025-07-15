/**
 * @swagger
 * tags:
 *   name: Atendimentos
 *   description: CRUD de atendimentos, interações e produtos de atendimento
 */
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
  UpdateAtendimentoInteracaoController,
  CreateAtendimentoProdutoController,
  GetAllAtendimentoProdutosController,
  GetAtendimentoProdutoByCodigoController,
  UpdateAtendimentoProdutoController,
  DeleteAtendimentoProdutoController
} from '../database/controllers/AtendimentoController';

const routesAtendimento = Router();

/**
 * @swagger
 * /atendimentos:
 *   post:
 *     summary: Cria um novo atendimento
 *     tags: [Atendimentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigoEmpresa
 *               - codigoUsuario
 *               - codigoCliente
 *               - codigoStatus
 *               - codigoSituacao
 *             properties:
 *               codigoEmpresa:
 *                 type: string
 *                 example: 0001
 *               codigoUsuario:
 *                 type: string
 *                 example: 000001
 *               codigoCliente:
 *                 type: string
 *                 example: 000001
 *               codigoStatus:
 *                 type: string
 *                 example: 001
 *               codigoSituacao:
 *                 type: string
 *                 example: 001
 *     responses:
 *       201:
 *         description: Atendimento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 */
routesAtendimento.post('/atendimentos', new CreateAtendimentoController().handle);

/**
 * @swagger
 * /atendimentos:
 *   get:
 *     summary: Lista todos os atendimentos
 *     tags: [Atendimentos]
 *     responses:
 *       200:
 *         description: Lista de atendimentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 */
routesAtendimento.get('/atendimentos', new GetAllAtendimentosController().handle);

/**
 * @swagger
 * /atendimentos/{codigo}:
 *   get:
 *     summary: Busca um atendimento pelo código
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do atendimento
 *     responses:
 *       200:
 *         description: Atendimento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *       404:
 *         description: Atendimento não encontrado
 */
routesAtendimento.get('/atendimentos/:codigo', new GetAtendimentoByCodigoController().handle);

/**
 * @swagger
 * /atendimentos/{codigo}:
 *   put:
 *     summary: Atualiza um atendimento pelo código
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do atendimento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigoEmpresa:
 *                 type: string
 *               codigoUsuario:
 *                 type: string
 *               codigoCliente:
 *                 type: string
 *               codigoStatus:
 *                 type: string
 *               codigoSituacao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Atendimento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *       404:
 *         description: Atendimento não encontrado
 */
routesAtendimento.put('/atendimentos/:codigo', new UpdateAtendimentoController().handle);

/**
 * @swagger
 * /atendimentos/{codigo}:
 *   delete:
 *     summary: Remove um atendimento pelo código
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do atendimento
 *     responses:
 *       204:
 *         description: Atendimento removido com sucesso
 *       404:
 *         description: Atendimento não encontrado
 */
routesAtendimento.delete('/atendimentos/:codigo', new DeleteAtendimentoController().handle);

// AtendimentoInteracao
/**
 * @swagger
 * /atendimento-interacoes:
 *   post:
 *     summary: Cria uma nova interação de atendimento
 *     tags: [Atendimentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigoAtendimento
 *               - codigoTecnico
 *               - codigoStatus
 *               - codigoSituacao
 *             properties:
 *               codigoAtendimento:
 *                 type: string
 *                 example: 0000000001
 *               codigoTecnico:
 *                 type: string
 *                 example: 000001
 *               codigoStatus:
 *                 type: string
 *                 example: 001
 *               codigoSituacao:
 *                 type: string
 *                 example: 001
 *     responses:
 *       201:
 *         description: Interação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 */
routesAtendimento.post('/atendimento-interacoes', new CreateAtendimentoInteracaoController().handle);

/**
 * @swagger
 * /atendimento-interacoes:
 *   get:
 *     summary: Lista todas as interações de atendimento
 *     tags: [Atendimentos]
 *     responses:
 *       200:
 *         description: Lista de interações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 */
routesAtendimento.get('/atendimento-interacoes', new GetAllAtendimentoInteracoesController().handle);

/**
 * @swagger
 * /atendimento-interacoes/{codigo}:
 *   get:
 *     summary: Busca uma interação de atendimento pelo código
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da interação
 *     responses:
 *       200:
 *         description: Interação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *       404:
 *         description: Interação não encontrada
 */
routesAtendimento.get('/atendimento-interacoes/:codigo', new GetAtendimentoInteracaoByCodigoController().handle);

/**
 * @swagger
 * /atendimento-interacoes/{codigo}:
 *   put:
 *     summary: Atualiza uma interação de atendimento pelo código
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da interação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigoStatus:
 *                 type: string
 *               codigoSituacao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Interação atualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *       404:
 *         description: Interação não encontrada
 */
routesAtendimento.put('/atendimento-interacoes/:codigo', new UpdateAtendimentoInteracaoController().handle);

/**
 * @swagger
 * /atendimento-interacoes/{codigo}:
 *   delete:
 *     summary: Remove uma interação de atendimento pelo código
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da interação
 *     responses:
 *       204:
 *         description: Interação removida com sucesso
 *       404:
 *         description: Interação não encontrada
 */
routesAtendimento.delete('/atendimento-interacoes/:codigo', new DeleteAtendimentoInteracaoController().handle);

// Rotas para buscar interações e produtos de um atendimento específico
/**
 * @swagger
 * /atendimentos/{codigo}/interacoes:
 *   get:
 *     summary: Lista todas as interações de um atendimento
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do atendimento
 *     responses:
 *       200:
 *         description: Lista de interações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 */
routesAtendimento.get('/atendimentos/:codigo/interacoes', new GetInteracoesByAtendimentoController().handle);

/**
 * @swagger
 * /atendimentos/{codigo}/produtos:
 *   get:
 *     summary: Lista todos os produtos de um atendimento
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do atendimento
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigoAtendimento:
 *                     type: string
 *                   codigoProduto:
 *                     type: string
 */
routesAtendimento.get('/atendimentos/:codigo/produtos', new GetProdutosByAtendimentoController().handle);

/**
 * @swagger
 * /atendimento-produtos:
 *   post:
 *     summary: Cria um novo produto de atendimento
 *     tags: [Atendimentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigoAtendimento
 *               - codigoUsuario
 *               - dataInclusao
 *               - tipoProduto
 *               - posicao
 *               - codigoProduto
 *               - qtd
 *               - unidade
 *               - vlrUnit
 *               - vlrTotal
 *               - vlrCusto
 *             properties:
 *               codigoAtendimento:
 *                 type: string
 *               codigoUsuario:
 *                 type: string
 *               dataInclusao:
 *                 type: string
 *                 format: date-time
 *               tipoProduto:
 *                 type: string
 *               posicao:
 *                 type: integer
 *               codigoProduto:
 *                 type: string
 *               qtd:
 *                 type: number
 *               unidade:
 *                 type: string
 *               vlrUnit:
 *                 type: number
 *               vlrTotal:
 *                 type: number
 *               vlrCusto:
 *                 type: number
 *               codigoAuxiliar:
 *                 type: string
 *               observacao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Produto de atendimento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: integer
 */
routesAtendimento.post('/atendimento-produtos', new CreateAtendimentoProdutoController().handle);

/**
 * @swagger
 * /atendimento-produtos:
 *   get:
 *     summary: Lista todos os produtos de atendimento
 *     tags: [Atendimentos]
 *     responses:
 *       200:
 *         description: Lista de produtos de atendimento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: integer
 */
routesAtendimento.get('/atendimento-produtos', new GetAllAtendimentoProdutosController().handle);

/**
 * @swagger
 * /atendimento-produtos/{codigo}:
 *   get:
 *     summary: Busca um produto de atendimento pelo código
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código do produto de atendimento
 *     responses:
 *       200:
 *         description: Produto de atendimento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: integer
 *       404:
 *         description: Produto de atendimento não encontrado
 */
routesAtendimento.get('/atendimento-produtos/:codigo', new GetAtendimentoProdutoByCodigoController().handle);

/**
 * @swagger
 * /atendimento-produtos/{codigo}:
 *   put:
 *     summary: Atualiza um produto de atendimento pelo código
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código do produto de atendimento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoProduto:
 *                 type: string
 *               posicao:
 *                 type: integer
 *               qtd:
 *                 type: number
 *               unidade:
 *                 type: string
 *               vlrUnit:
 *                 type: number
 *               vlrTotal:
 *                 type: number
 *               vlrCusto:
 *                 type: number
 *               observacao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Produto de atendimento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: integer
 *       404:
 *         description: Produto de atendimento não encontrado
 */
routesAtendimento.put('/atendimento-produtos/:codigo', new UpdateAtendimentoProdutoController().handle);

/**
 * @swagger
 * /atendimento-produtos/{codigo}:
 *   delete:
 *     summary: Remove um produto de atendimento pelo código
 *     tags: [Atendimentos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código do produto de atendimento
 *     responses:
 *       204:
 *         description: Produto de atendimento removido com sucesso
 *       404:
 *         description: Produto de atendimento não encontrado
 */
routesAtendimento.delete('/atendimento-produtos/:codigo', new DeleteAtendimentoProdutoController().handle);

export { routesAtendimento };
