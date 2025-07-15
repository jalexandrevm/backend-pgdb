/**
 * @swagger
 * tags:
 *   name: Técnicos
 *   description: CRUD de técnicos
 */
import { Router } from 'express';
import { CreateTecnicoController, GetAllTecnicosController, GetTecnicoByCodigoController, UpdateTecnicoController, DeleteTecnicoController } from '../database/controllers/TecnicoController';

const routesTecnico = Router();

/**
 * @swagger
 * /tecnicos:
 *   post:
 *     summary: Cria um novo técnico
 *     tags: [Técnicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - apelido
 *               - senha
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Maria
 *               apelido:
 *                 type: string
 *                 example: maria
 *               senha:
 *                 type: string
 *                 example: 123456
 *               email:
 *                 type: string
 *                 example: maria@email.com
 *     responses:
 *       201:
 *         description: Técnico criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 apelido:
 *                   type: string
 *                 email:
 *                   type: string
 */
routesTecnico.post('/tecnicos', new CreateTecnicoController().handle);

/**
 * @swagger
 * /tecnicos:
 *   get:
 *     summary: Lista todos os técnicos
 *     tags: [Técnicos]
 *     responses:
 *       200:
 *         description: Lista de técnicos
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
 *                   apelido:
 *                     type: string
 *                   email:
 *                     type: string
 */
routesTecnico.get('/tecnicos', new GetAllTecnicosController().handle);

/**
 * @swagger
 * /tecnicos/{codigoUsuario}/{codigo}:
 *   get:
 *     summary: Busca um técnico pelo código
 *     tags: [Técnicos]
 *     parameters:
 *       - in: path
 *         name: codigoUsuario
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do usuário relacionado
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do técnico
 *     responses:
 *       200:
 *         description: Técnico encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 apelido:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Técnico não encontrado
 */
routesTecnico.get('/tecnicos/:codigoUsuario/:codigo', new GetTecnicoByCodigoController().handle);

/**
 * @swagger
 * /tecnicos/{codigoUsuario}/{codigo}:
 *   put:
 *     summary: Atualiza um técnico pelo código
 *     tags: [Técnicos]
 *     parameters:
 *       - in: path
 *         name: codigoUsuario
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do usuário relacionado
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do técnico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               apelido:
 *                 type: string
 *               senha:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Técnico atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 apelido:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: Técnico não encontrado
 */
routesTecnico.put('/tecnicos/:codigoUsuario/:codigo', new UpdateTecnicoController().handle);

/**
 * @swagger
 * /tecnicos/{codigoUsuario}/{codigo}:
 *   delete:
 *     summary: Remove um técnico pelo código
 *     tags: [Técnicos]
 *     parameters:
 *       - in: path
 *         name: codigoUsuario
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do usuário relacionado
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do técnico
 *     responses:
 *       204:
 *         description: Técnico removido com sucesso
 *       404:
 *         description: Técnico não encontrado
 */
routesTecnico.delete('/tecnicos/:codigoUsuario/:codigo', new DeleteTecnicoController().handle);

export { routesTecnico };
