/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: CRUD de empresas
 */
import { Router } from 'express';
import { CreateEmpresaController, GetAllEmpresasController, GetEmpresaByCodigoController, UpdateEmpresaController, DeleteEmpresaController } from '../database/controllers/EmpresaController';

const routesEmpresa = Router();

/**
 * @swagger
 * /empresas:
 *   post:
 *     summary: Cria uma nova empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cnpj_cpf
 *               - ie_rg
 *               - razao_nome
 *               - fantasia_apelido
 *             properties:
 *               cnpj_cpf:
 *                 type: string
 *                 example: 12345678000199
 *               ie_rg:
 *                 type: string
 *                 example: 12345678
 *               razao_nome:
 *                 type: string
 *                 example: Empresa Exemplo Ltda
 *               fantasia_apelido:
 *                 type: string
 *                 example: Exemplo
 *     responses:
 *       201:
 *         description: Empresa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 cnpj_cpf:
 *                   type: string
 *                 razao_nome:
 *                   type: string
 *                 fantasia_apelido:
 *                   type: string
 */
routesEmpresa.post('/empresas', new CreateEmpresaController().handle);

/**
 * @swagger
 * /empresas:
 *   get:
 *     summary: Lista todas as empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Lista de empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: string
 *                   cnpj_cpf:
 *                     type: string
 *                   razao_nome:
 *                     type: string
 *                   fantasia_apelido:
 *                     type: string
 */
routesEmpresa.get('/empresas', new GetAllEmpresasController().handle);

/**
 * @swagger
 * /empresas/{codigo}:
 *   get:
 *     summary: Busca uma empresa pelo código
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da empresa
 *     responses:
 *       200:
 *         description: Empresa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 cnpj_cpf:
 *                   type: string
 *                 razao_nome:
 *                   type: string
 *                 fantasia_apelido:
 *                   type: string
 *       404:
 *         description: Empresa não encontrada
 */
routesEmpresa.get('/empresas/:codigo', new GetEmpresaByCodigoController().handle);

/**
 * @swagger
 * /empresas/{codigo}:
 *   put:
 *     summary: Atualiza uma empresa pelo código
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cnpj_cpf:
 *                 type: string
 *               ie_rg:
 *                 type: string
 *               razao_nome:
 *                 type: string
 *               fantasia_apelido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa atualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 cnpj_cpf:
 *                   type: string
 *                 razao_nome:
 *                   type: string
 *                 fantasia_apelido:
 *                   type: string
 *       404:
 *         description: Empresa não encontrada
 */
routesEmpresa.put('/empresas/:codigo', new UpdateEmpresaController().handle);

/**
 * @swagger
 * /empresas/{codigo}:
 *   delete:
 *     summary: Remove uma empresa pelo código
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da empresa
 *     responses:
 *       204:
 *         description: Empresa removida com sucesso
 *       404:
 *         description: Empresa não encontrada
 */
routesEmpresa.delete('/empresas/:codigo', new DeleteEmpresaController().handle);

export { routesEmpresa };
