import { CreateUsuarioService, GetAllUsuariosService, GetUsuarioByCodigoService, UpdateUsuarioService, DeleteUsuarioService } from '../services/UsuarioService';

export class CreateUsuarioController {
  async handle(req: any, res: any) {
    const required = ['codigo', 'nome', 'apelido', 'senha', 'email', 'permissao'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    const service = new CreateUsuarioService();
    const usuario = await service.execute(req.body);
    return res.status(201).json(usuario);
  }
}

export class GetAllUsuariosController {
  async handle(req: any, res: any) {
    const service = new GetAllUsuariosService();
    const usuarios = await service.execute();
    return res.json(usuarios);
  }
}

export class GetUsuarioByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetUsuarioByCodigoService();
    const usuario = await service.execute(codigo);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    return res.json(usuario);
  }
}

export class UpdateUsuarioController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new UpdateUsuarioService();
    const usuario = await service.execute(codigo, req.body);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    return res.json(usuario);
  }
}

export class DeleteUsuarioController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteUsuarioService();
    const ok = await service.execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Usuário não encontrado' });
    return res.status(204).send();
  }
}
