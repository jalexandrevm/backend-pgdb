/**
 * @swagger
 * tags:
 *   name: Situações
 *   description: CRUD de situações
 */
import { Router } from 'express';
import { CreateSituacaoController, GetAllSituacoesController, GetSituacaoByCodigoController, UpdateSituacaoController, DeleteSituacaoController } from '../database/controllers/SituacaoController';

const routesSituacao = Router();

/**
 * @swagger
 * /situacoes:
 *   post:
 *     summary: Cria uma nova situação
 *     tags: [Situações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descricao
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: Resolvido
 *     responses:
 *       201:
 *         description: Situação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 descricao:
 *                   type: string
 */
routesSituacao.post('/situacoes', new CreateSituacaoController().handle);

/**
 * @swagger
 * /situacoes:
 *   get:
 *     summary: Lista todas as situações
 *     tags: [Situações]
 *     responses:
 *       200:
 *         description: Lista de situações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 *                   descricao:
 *                     type: string
 */
routesSituacao.get('/situacoes', new GetAllSituacoesController().handle);

/**
 * @swagger
 * /situacoes/{codigoStatus}/{codigo}:
 *   get:
 *     summary: Busca uma situação pelo código
 *     tags: [Situações]
 *     parameters:
 *       - in: path
 *         name: codigoStatus
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do status relacionado
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da situação
 *     responses:
 *       200:
 *         description: Situação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *       404:
 *         description: Situação não encontrada
 */
routesSituacao.get('/situacoes/:codigoStatus/:codigo', new GetSituacaoByCodigoController().handle);

/**
 * @swagger
 * /situacoes/{codigoStatus}/{codigo}:
 *   put:
 *     summary: Atualiza uma situação pelo código
 *     tags: [Situações]
 *     parameters:
 *       - in: path
 *         name: codigoStatus
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do status relacionado
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da situação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Situação atualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *       404:
 *         description: Situação não encontrada
 */
routesSituacao.put('/situacoes/:codigoStatus/:codigo', new UpdateSituacaoController().handle);

/**
 * @swagger
 * /situacoes/{codigoStatus}/{codigo}:
 *   delete:
 *     summary: Remove uma situação pelo código
 *     tags: [Situações]
 *     parameters:
 *       - in: path
 *         name: codigoStatus
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do status relacionado
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da situação
 *     responses:
 *       204:
 *         description: Situação removida com sucesso
 *       404:
 *         description: Situação não encontrada
 */
routesSituacao.delete('/situacoes/:codigoStatus/:codigo', new DeleteSituacaoController().handle);

export { routesSituacao };
