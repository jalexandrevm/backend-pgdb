/**
 * @swagger
 * tags:
 *   name: Status
 *   description: CRUD de status
 */
import { Router } from 'express';
import { CreateStatusController, GetAllStatusController, GetStatusByCodigoController, UpdateStatusController, DeleteStatusController } from '../database/controllers/StatusController';

const routesStatus = Router();

/**
 * @swagger
 * /status:
 *   post:
 *     summary: Cria um novo status
 *     tags: [Status]
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
 *                 example: Em andamento
 *     responses:
 *       201:
 *         description: Status criado com sucesso
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
routesStatus.post('/status', new CreateStatusController().handle);

/**
 * @swagger
 * /status:
 *   get:
 *     summary: Lista todos os status
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: Lista de status
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
routesStatus.get('/status', new GetAllStatusController().handle);

/**
 * @swagger
 * /status/{codigo}:
 *   get:
 *     summary: Busca um status pelo código
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do status
 *     responses:
 *       200:
 *         description: Status encontrado
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
 *         description: Status não encontrado
 */
routesStatus.get('/status/:codigo', new GetStatusByCodigoController().handle);

/**
 * @swagger
 * /status/{codigo}:
 *   put:
 *     summary: Atualiza um status pelo código
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do status
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
 *         description: Status atualizado
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
 *         description: Status não encontrado
 */
routesStatus.put('/status/:codigo', new UpdateStatusController().handle);

/**
 * @swagger
 * /status/{codigo}:
 *   delete:
 *     summary: Remove um status pelo código
 *     tags: [Status]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do status
 *     responses:
 *       204:
 *         description: Status removido com sucesso
 *       404:
 *         description: Status não encontrado
 */
routesStatus.delete('/status/:codigo', new DeleteStatusController().handle);

export { routesStatus };
