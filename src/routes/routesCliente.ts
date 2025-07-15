/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: CRUD de clientes
 */
import { Router } from 'express';
import { CreateClienteController, GetAllClientesController, GetClienteByCodigoController, UpdateClienteController, DeleteClienteController } from '../database/controllers/ClienteController';

const routesCliente = Router();

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - sexo
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Ana
 *               sexo:
 *                 type: string
 *                 enum: [M, F, E]
 *                 example: F
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 sexo:
 *                   type: string
 */
routesCliente.post('/clientes', new CreateClienteController().handle);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   sexo:
 *                     type: string
 */
routesCliente.get('/clientes', new GetAllClientesController().handle);

/**
 * @swagger
 * /clientes/{codigo}:
 *   get:
 *     summary: Busca um cliente pelo código
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 sexo:
 *                   type: string
 *       404:
 *         description: Cliente não encontrado
 */
routesCliente.get('/clientes/:codigo', new GetClienteByCodigoController().handle);

/**
 * @swagger
 * /clientes/{codigo}:
 *   put:
 *     summary: Atualiza um cliente pelo código
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               sexo:
 *                 type: string
 *                 enum: [M, F, E]
 *     responses:
 *       200:
 *         description: Cliente atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 sexo:
 *                   type: string
 *       404:
 *         description: Cliente não encontrado
 */
routesCliente.put('/clientes/:codigo', new UpdateClienteController().handle);

/**
 * @swagger
 * /clientes/{codigo}:
 *   delete:
 *     summary: Remove um cliente pelo código
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do cliente
 *     responses:
 *       204:
 *         description: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 */
routesCliente.delete('/clientes/:codigo', new DeleteClienteController().handle);

export { routesCliente };
