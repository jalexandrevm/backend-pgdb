/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: CRUD de produtos e produtos auxiliares
 */
import { Router } from 'express';
import { CreateProdutoController, GetAllProdutosController, GetProdutoByCodigoController, UpdateProdutoController, DeleteProdutoController, CreateProdutoAuxiliarController, GetAllProdutoAuxiliaresController, GetProdutoAuxiliarByCodigoController, UpdateProdutoAuxiliarController, DeleteProdutoAuxiliarController } from '../database/controllers/ProdutoController';

// Rotas para Produto
const routesProduto = Router();

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
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
 *                 example: Produto A
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
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
routesProduto.post('/produtos', new CreateProdutoController().handle);

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
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
 *                   codigo:
 *                     type: string
 *                   descricao:
 *                     type: string
 */
routesProduto.get('/produtos', new GetAllProdutosController().handle);

/**
 * @swagger
 * /produtos/{codigo}:
 *   get:
 *     summary: Busca um produto pelo código
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
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
 *         description: Produto não encontrado
 */
routesProduto.get('/produtos/:codigo', new GetProdutoByCodigoController().handle);

/**
 * @swagger
 * /produtos/{codigo}:
 *   put:
 *     summary: Atualiza um produto pelo código
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do produto
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
 *         description: Produto atualizado
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
 *         description: Produto não encontrado
 */
routesProduto.put('/produtos/:codigo', new UpdateProdutoController().handle);

/**
 * @swagger
 * /produtos/{codigo}:
 *   delete:
 *     summary: Remove um produto pelo código
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do produto
 *     responses:
 *       204:
 *         description: Produto removido com sucesso
 *       404:
 *         description: Produto não encontrado
 */
routesProduto.delete('/produtos/:codigo', new DeleteProdutoController().handle);

// Rotas para ProdutoAuxiliar
const routesProdutoAuxiliar = Router();
/**
 * @swagger
 * /produtoauxiliares:
 *   post:
 *     summary: Cria um novo produto auxiliar
 *     tags: [Produtos]
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
 *                 example: Produto Auxiliar B
 *     responses:
 *       201:
 *         description: Produto auxiliar criado com sucesso
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
routesProdutoAuxiliar.post('/produtoauxiliares', new CreateProdutoAuxiliarController().handle);

/**
 * @swagger
 * /produtoauxiliares:
 *   get:
 *     summary: Lista todos os produtos auxiliares
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de produtos auxiliares
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
routesProdutoAuxiliar.get('/produtoauxiliares', new GetAllProdutoAuxiliaresController().handle);

/**
 * @swagger
 * /produtoauxiliares/{codigo}:
 *   get:
 *     summary: Busca um produto auxiliar pelo código
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do produto auxiliar
 *     responses:
 *       200:
 *         description: Produto auxiliar encontrado
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
 *         description: Produto auxiliar não encontrado
 */
routesProdutoAuxiliar.get('/produtoauxiliares/:codigo', new GetProdutoAuxiliarByCodigoController().handle);

/**
 * @swagger
 * /produtoauxiliares/{codigo}:
 *   put:
 *     summary: Atualiza um produto auxiliar pelo código
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do produto auxiliar
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
 *         description: Produto auxiliar atualizado
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
 *         description: Produto auxiliar não encontrado
 */
routesProdutoAuxiliar.put('/produtoauxiliares/:codigo', new UpdateProdutoAuxiliarController().handle);

/**
 * @swagger
 * /produtoauxiliares/{codigo}:
 *   delete:
 *     summary: Remove um produto auxiliar pelo código
 *     tags: [Produtos]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *         description: Código do produto auxiliar
 *     responses:
 *       204:
 *         description: Produto auxiliar removido com sucesso
 *       404:
 *         description: Produto auxiliar não encontrado
 */
routesProdutoAuxiliar.delete('/produtoauxiliares/:codigo', new DeleteProdutoAuxiliarController().handle);

export { routesProduto, routesProdutoAuxiliar };
