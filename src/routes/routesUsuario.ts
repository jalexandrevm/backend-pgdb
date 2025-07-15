/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: CRUD de usuários
 */

import { Router } from "express";
import { CreateUsuarioController, GetAllUsuariosController, GetUsuarioByCodigoController, UpdateUsuarioController, DeleteUsuarioController } from '../database/controllers/UsuarioController';

const routesUsuario = Router();

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
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
 *                 example: João
 *               apelido:
 *                 type: string
 *                 example: joao
 *               senha:
 *                 type: string
 *                 example: 123456
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
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
routesUsuario.post('/usuarios', new CreateUsuarioController().handle);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
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
routesUsuario.get('/usuarios', new GetAllUsuariosController().handle);

/**
 * @swagger
 * /usuarios/{codigo}:
 *   get:
 *     summary: Busca um usuário pelo código
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
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
 *         description: Usuário não encontrado
 */
routesUsuario.get('/usuarios/:codigo', new GetUsuarioByCodigoController().handle);

/**
 * @swagger
 * /usuarios/{codigo}:
 *   put:
 *     summary: Atualiza um usuário pelo código
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do usuário
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
 *         description: Usuário atualizado
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
 *         description: Usuário não encontrado
 */
routesUsuario.put('/usuarios/:codigo', new UpdateUsuarioController().handle);

/**
 * @swagger
 * /usuarios/{codigo}:
 *   delete:
 *     summary: Remove um usuário pelo código
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do usuário
 *     responses:
 *       204:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
routesUsuario.delete('/usuarios/:codigo', new DeleteUsuarioController().handle);

export { routesUsuario };
