import { Router } from 'express';
import { CreateProdutoController, GetAllProdutosController, GetProdutoByCodigoController, UpdateProdutoController, DeleteProdutoController } from '../database/controllers/ProdutoController';

const routesProduto = Router();

routesProduto.post('/produtos', new CreateProdutoController().handle);
routesProduto.get('/produtos', new GetAllProdutosController().handle);
routesProduto.get('/produtos/:codigo', new GetProdutoByCodigoController().handle);
routesProduto.put('/produtos/:codigo', new UpdateProdutoController().handle);
routesProduto.delete('/produtos/:codigo', new DeleteProdutoController().handle);

export { routesProduto };
