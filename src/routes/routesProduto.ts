import { Router } from 'express';
import { CreateProdutoController, GetAllProdutosController, GetProdutoByCodigoController, UpdateProdutoController, DeleteProdutoController, CreateProdutoAuxiliarController, GetAllProdutoAuxiliaresController, GetProdutoAuxiliarByCodigoController, UpdateProdutoAuxiliarController, DeleteProdutoAuxiliarController } from '../database/controllers/ProdutoController';

// Rotas para Produto
const routesProduto = Router();

routesProduto.post('/produtos', new CreateProdutoController().handle);
routesProduto.get('/produtos', new GetAllProdutosController().handle);
routesProduto.get('/produtos/:codigo', new GetProdutoByCodigoController().handle);
routesProduto.put('/produtos/:codigo', new UpdateProdutoController().handle);
routesProduto.delete('/produtos/:codigo', new DeleteProdutoController().handle);

// Rotas para ProdutoAuxiliar
const routesProdutoAuxiliar = Router();

routesProdutoAuxiliar.post('/produtoauxiliares', new CreateProdutoAuxiliarController().handle);
routesProdutoAuxiliar.get('/produtoauxiliares', new GetAllProdutoAuxiliaresController().handle);
routesProdutoAuxiliar.get('/produtoauxiliares/:codigo', new GetProdutoAuxiliarByCodigoController().handle);
routesProdutoAuxiliar.put('/produtoauxiliares/:codigo', new UpdateProdutoAuxiliarController().handle);
routesProdutoAuxiliar.delete('/produtoauxiliares/:codigo', new DeleteProdutoAuxiliarController().handle);

export { routesProduto, routesProdutoAuxiliar };
