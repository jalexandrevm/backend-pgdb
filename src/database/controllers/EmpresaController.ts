import { Request, Response } from 'express';
import { CreateEmpresaService, GetAllEmpresasService, GetEmpresaByCodigoService, UpdateEmpresaService, DeleteEmpresaService } from '../services/EmpresaService';

export class CreateEmpresaController {
  async handle(req: any, res: any) {
    const required = [
      'codigo', 'cnpj_cpf', 'ie_rg', 'razao_nome', 'fantasia_apelido', 'cep', 'pais', 'uf', 'cidade', 'logradouro', 'numero', 'bairro', 'complemento', 'fone1', 'fone2', 'email', 'regime_estadual', 'regime_federal'
    ];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    const service = new CreateEmpresaService();
    const empresa = await service.execute(req.body);
    return res.status(201).json(empresa);
  }
}

export class GetAllEmpresasController {
  async handle(req: any, res: any) {
    const service = new GetAllEmpresasService();
    const empresas = await service.execute();
    return res.json(empresas);
  }
}

export class GetEmpresaByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new GetEmpresaByCodigoService();
    const empresa = await service.execute(codigo);
    if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada' });
    return res.json(empresa);
  }
}

export class UpdateEmpresaController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new UpdateEmpresaService();
    const empresa = await service.execute(codigo, req.body);
    if (!empresa) return res.status(404).json({ error: 'Empresa não encontrada' });
    return res.json(empresa);
  }
}

export class DeleteEmpresaController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    if (!codigo) return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
    const service = new DeleteEmpresaService();
    const ok = await service.execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Empresa não encontrada' });
    return res.status(204).send();
  }
}
