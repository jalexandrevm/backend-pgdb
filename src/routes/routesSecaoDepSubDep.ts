/**
 * @swagger
 * tags:
 *   name: Seções
 *   description: CRUD de seções, departamentos e subdepartamentos
 */
import { Router } from 'express';
import {
  CreateSecaoController, GetAllSecoesController, GetSecaoByCodigoController, UpdateSecaoController, DeleteSecaoController,
  CreateDepartamentoController, GetAllDepartamentosController, GetDepartamentoByIdController, UpdateDepartamentoController, DeleteDepartamentoController,
  CreateSubDepartamentoController, GetAllSubDepartamentosController, GetSubDepartamentoByIdController, UpdateSubDepartamentoController, DeleteSubDepartamentoController
} from '../database/controllers/SecaoDepSubDepController';

const routesSecaoDepSubDep = Router();

/**
 * @swagger
 * /secoes:
 *   post:
 *     summary: Cria uma nova seção
 *     tags: [Seções]
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
 *                 example: Seção A
 *     responses:
 *       201:
 *         description: Seção criada com sucesso
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
routesSecaoDepSubDep.post('/secoes', new CreateSecaoController().handle);

/**
 * @swagger
 * /secoes:
 *   get:
 *     summary: Lista todas as seções
 *     tags: [Seções]
 *     responses:
 *       200:
 *         description: Lista de seções
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
routesSecaoDepSubDep.get('/secoes', new GetAllSecoesController().handle);

/**
 * @swagger
 * /secoes/{codigo}:
 *   get:
 *     summary: Busca uma seção pelo código
 *     tags: [Seções]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da seção
 *     responses:
 *       200:
 *         description: Seção encontrada
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
 *         description: Seção não encontrada
 */
routesSecaoDepSubDep.get('/secoes/:codigo', new GetSecaoByCodigoController().handle);

/**
 * @swagger
 * /secoes/{codigo}:
 *   put:
 *     summary: Atualiza uma seção pelo código
 *     tags: [Seções]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da seção
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
 *         description: Seção atualizada
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
 *         description: Seção não encontrada
 */
routesSecaoDepSubDep.put('/secoes/:codigo', new UpdateSecaoController().handle);

/**
 * @swagger
 * /secoes/{codigo}:
 *   delete:
 *     summary: Remove uma seção pelo código
 *     tags: [Seções]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da seção
 *     responses:
 *       204:
 *         description: Seção removida com sucesso
 *       404:
 *         description: Seção não encontrada
 */
routesSecaoDepSubDep.delete('/secoes/:codigo', new DeleteSecaoController().handle);

// Departamento
/**
 * @swagger
 * /departamentos:
 *   post:
 *     summary: Cria um novo departamento
 *     tags: [Seções]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descricao
 *               - codigoSecaoDep
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: Departamento X
 *               codigoSecaoDep:
 *                 type: string
 *                 example: 01
 *     responses:
 *       201:
 *         description: Departamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 codigoSecaoDep:
 *                   type: string
 */
routesSecaoDepSubDep.post('/departamentos', new CreateDepartamentoController().handle);

/**
 * @swagger
 * /departamentos:
 *   get:
 *     summary: Lista todos os departamentos
 *     tags: [Seções]
 *     responses:
 *       200:
 *         description: Lista de departamentos
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
 *                   codigoSecaoDep:
 *                     type: string
 */
routesSecaoDepSubDep.get('/departamentos', new GetAllDepartamentosController().handle);

/**
 * @swagger
 * /departamentos/{codigoSecaoDep}/{codigo}:
 *   get:
 *     summary: Busca um departamento pelo código
 *     tags: [Seções]
 *     parameters:
 *       - in: path
 *         name: codigoSecaoDep
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da seção relacionada
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do departamento
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 codigoSecaoDep:
 *                   type: string
 *       404:
 *         description: Departamento não encontrado
 */
routesSecaoDepSubDep.get('/departamentos/:codigoSecaoDep/:codigo', new GetDepartamentoByIdController().handle);

/**
 * @swagger
 * /departamentos/{codigoSecaoDep}/{codigo}:
 *   put:
 *     summary: Atualiza um departamento pelo código
 *     tags: [Seções]
 *     parameters:
 *       - in: path
 *         name: codigoSecaoDep
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da seção relacionada
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do departamento
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
 *         description: Departamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 codigoSecaoDep:
 *                   type: string
 *       404:
 *         description: Departamento não encontrado
 */
routesSecaoDepSubDep.put('/departamentos/:codigoSecaoDep/:codigo', new UpdateDepartamentoController().handle);

/**
 * @swagger
 * /departamentos/{codigoSecaoDep}/{codigo}:
 *   delete:
 *     summary: Remove um departamento pelo código
 *     tags: [Seções]
 *     parameters:
 *       - in: path
 *         name: codigoSecaoDep
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da seção relacionada
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do departamento
 *     responses:
 *       204:
 *         description: Departamento removido com sucesso
 *       404:
 *         description: Departamento não encontrado
 */
routesSecaoDepSubDep.delete('/departamentos/:codigoSecaoDep/:codigo', new DeleteDepartamentoController().handle);

// SubDepartamento
/**
 * @swagger
 * /subdepartamentos:
 *   post:
 *     summary: Cria um novo subdepartamento
 *     tags: [Seções]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - descricao
 *               - codigoSecaoSubD
 *               - codigoDepartamentoSubD
 *             properties:
 *               descricao:
 *                 type: string
 *                 example: Subdepartamento Y
 *               codigoSecaoSubD:
 *                 type: string
 *                 example: 01
 *               codigoDepartamentoSubD:
 *                 type: string
 *                 example: 01
 *     responses:
 *       201:
 *         description: Subdepartamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 codigoSecaoSubD:
 *                   type: string
 *                 codigoDepartamentoSubD:
 *                   type: string
 */
routesSecaoDepSubDep.post('/subdepartamentos', new CreateSubDepartamentoController().handle);

/**
 * @swagger
 * /subdepartamentos:
 *   get:
 *     summary: Lista todos os subdepartamentos
 *     tags: [Seções]
 *     responses:
 *       200:
 *         description: Lista de subdepartamentos
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
 *                   codigoSecaoSubD:
 *                     type: string
 *                   codigoDepartamentoSubD:
 *                     type: string
 */
routesSecaoDepSubDep.get('/subdepartamentos', new GetAllSubDepartamentosController().handle);

/**
 * @swagger
 * /subdepartamentos/{codigoSecaoSubD}/{codigoDepartamentoSubD}/{codigo}:
 *   get:
 *     summary: Busca um subdepartamento pelo código
 *     tags: [Seções]
 *     parameters:
 *       - in: path
 *         name: codigoSecaoSubD
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da seção relacionada
 *       - in: path
 *         name: codigoDepartamentoSubD
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do departamento relacionado
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do subdepartamento
 *     responses:
 *       200:
 *         description: Subdepartamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 codigoSecaoSubD:
 *                   type: string
 *                 codigoDepartamentoSubD:
 *                   type: string
 *       404:
 *         description: Subdepartamento não encontrado
 */
routesSecaoDepSubDep.get('/subdepartamentos/:codigoSecaoSubD/:codigoDepartamentoSubD/:codigo', new GetSubDepartamentoByIdController().handle);

/**
 * @swagger
 * /subdepartamentos/{codigoSecaoSubD}/{codigoDepartamentoSubD}/{codigo}:
 *   put:
 *     summary: Atualiza um subdepartamento pelo código
 *     tags: [Seções]
 *     parameters:
 *       - in: path
 *         name: codigoSecaoSubD
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da seção relacionada
 *       - in: path
 *         name: codigoDepartamentoSubD
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do departamento relacionado
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do subdepartamento
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
 *         description: Subdepartamento atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: string
 *                 descricao:
 *                   type: string
 *                 codigoSecaoSubD:
 *                   type: string
 *                 codigoDepartamentoSubD:
 *                   type: string
 *       404:
 *         description: Subdepartamento não encontrado
 */
routesSecaoDepSubDep.put('/subdepartamentos/:codigoSecaoSubD/:codigoDepartamentoSubD/:codigo', new UpdateSubDepartamentoController().handle);

/**
 * @swagger
 * /subdepartamentos/{codigoSecaoSubD}/{codigoDepartamentoSubD}/{codigo}:
 *   delete:
 *     summary: Remove um subdepartamento pelo código
 *     tags: [Seções]
 *     parameters:
 *       - in: path
 *         name: codigoSecaoSubD
 *         required: true
 *         schema:
 *           type: string
 *         description: Código da seção relacionada
 *       - in: path
 *         name: codigoDepartamentoSubD
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do departamento relacionado
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do subdepartamento
 *     responses:
 *       204:
 *         description: Subdepartamento removido com sucesso
 *       404:
 *         description: Subdepartamento não encontrado
 */
routesSecaoDepSubDep.delete('/subdepartamentos/:codigoSecaoSubD/:codigoDepartamentoSubD/:codigo', new DeleteSubDepartamentoController().handle);

export { routesSecaoDepSubDep };
