// import { any, Respoany } from 'express';
import { CreateSecaoService, GetAllSecoesService, GetSecaoByCodigoService, UpdateSecaoService, DeleteSecaoService, CreateDepartamentoService, GetAllDepartamentosService, GetDepartamentoByIdService, UpdateDepartamentoService, DeleteDepartamentoService, CreateSubDepartamentoService, GetAllSubDepartamentosService, GetSubDepartamentoByIdService, UpdateSubDepartamentoService, DeleteSubDepartamentoService } from '../services/SecaoDepSubDepService';

// Secao Controllers
export class CreateSecaoController {
  async handle(req: any, res: any) {
    if (!req.body.descricao) return res.status(400).json({ error: 'Parâmetro obrigatório: descricao' });
    try {
      const secao = await new CreateSecaoService().execute(req.body);
      return res.status(201).json(secao);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export class GetAllSecoesController {
  async handle(req: any, res: any) {
    const secoes = await new GetAllSecoesService().execute();
    return res.json(secoes);
  }
}

export class GetSecaoByCodigoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    const secao = await new GetSecaoByCodigoService().execute(codigo);
    if (!secao) return res.status(404).json({ error: 'Seção não encontrada' });
    return res.json(secao);
  }
}

export class UpdateSecaoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    try {
      const secao = await new UpdateSecaoService().execute(codigo, req.body);
      if (!secao) return res.status(404).json({ error: 'Seção não encontrada' });
      return res.json(secao);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export class DeleteSecaoController {
  async handle(req: any, res: any) {
    const { codigo } = req.params;
    const ok = await new DeleteSecaoService().execute(codigo);
    if (!ok) return res.status(404).json({ error: 'Seção não encontrada' });
    return res.status(204).send();
  }
}

// Departamento Controllers
export class CreateDepartamentoController {
  async handle(req: any, res: any) {
    const required = ['codigoSecaoDep', 'descricao'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    try {
      const departamento = await new CreateDepartamentoService().execute(req.body);
      return res.status(201).json(departamento);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export class GetAllDepartamentosController {
  async handle(req: any, res: any) {
    const departamentos = await new GetAllDepartamentosService().execute();
    return res.json(departamentos);
  }
}

export class GetDepartamentoByIdController {
  async handle(req: any, res: any) {
    const { codigoSecaoDep, codigo } = req.params;
    if (!codigoSecaoDep || !codigo) {
      return res.status(400).json({ error: 'Parâmetro obrigatório: codigoSecaoDep e codigo' });
    }
    const departamento = await new GetDepartamentoByIdService().execute(codigoSecaoDep, codigo);
    if (!departamento) return res.status(404).json({ error: 'Departamento não encontrado' });
    return res.json(departamento);
  }
}

export class UpdateDepartamentoController {
  async handle(req: any, res: any) {
    const { codigoSecaoDep, codigo } = req.params;
    if (!codigoSecaoDep || !codigo) {
      return res.status(400).json({ error: 'Parâmetro obrigatório: codigoSecaoDep e codigo' });
    }
    try {
      const departamento = await new UpdateDepartamentoService().execute(codigoSecaoDep, codigo, req.body);
      if (!departamento) return res.status(404).json({ error: 'Departamento não encontrado' });
      return res.json(departamento);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export class DeleteDepartamentoController {
  async handle(req: any, res: any) {
    const { codigoSecaoDep, codigo } = req.params;
    if (!codigoSecaoDep || !codigo) {
      return res.status(400).json({ error: 'Parâmetro obrigatório: codigoSecaoDep e codigo' });
    }
    const ok = await new DeleteDepartamentoService().execute(codigoSecaoDep, codigo);
    if (!ok) return res.status(404).json({ error: 'Departamento não encontrado' });
    return res.status(204).send();
  }
}

// SubDepartamento Controllers
export class CreateSubDepartamentoController {
  async handle(req: any, res: any) {
    const required = ['codigoSecaoSubD', 'codigoDepartamentoSubD', 'descricao'];
    for (const key of required) {
      if (!req.body[key]) return res.status(400).json({ error: `Parâmetro obrigatório: ${key}` });
    }
    try {
      const subdepartamento = await new CreateSubDepartamentoService().execute(req.body);
      return res.status(201).json(subdepartamento);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export class GetAllSubDepartamentosController {
  async handle(req: any, res: any) {
    const subdepartamentos = await new GetAllSubDepartamentosService().execute();
    return res.json(subdepartamentos);
  }
}

export class GetSubDepartamentoByIdController {
  async handle(req: any, res: any) {
    const { codigoSecaoSubD, codigoDepartamentoSubD, codigo } = req.params;
    if (!codigoSecaoSubD || !codigoDepartamentoSubD || !codigo) {
      return res.status(400).json({ error: 'Parâmetro obrigatório: codigoSecaoSubD, codigoDepartamentoSubD e codigo' });
    }
    const subdepartamento = await new GetSubDepartamentoByIdService().execute(codigoSecaoSubD, codigoDepartamentoSubD, codigo);
    if (!subdepartamento) return res.status(404).json({ error: 'Subdepartamento não encontrado' });
    return res.json(subdepartamento);
  }
}

export class UpdateSubDepartamentoController {
  async handle(req: any, res: any) {
    const { codigoSecaoSubD, codigoDepartamentoSubD, codigo } = req.params;
    if (!codigoSecaoSubD || !codigoDepartamentoSubD || !codigo) {
      return res.status(400).json({ error: 'Parâmetro obrigatório: codigoSecaoSubD, codigoDepartamentoSubD e codigo' });
    }
    try {
      const subdepartamento = await new UpdateSubDepartamentoService().execute(codigoSecaoSubD, codigoDepartamentoSubD, codigo, req.body);
      if (!subdepartamento) return res.status(404).json({ error: 'Subdepartamento não encontrado' });
      return res.json(subdepartamento);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export class DeleteSubDepartamentoController {
  async handle(req: any, res: any) {
    const { codigoSecaoSubD, codigoDepartamentoSubD, codigo } = req.params;
    if (!codigoSecaoSubD || !codigoDepartamentoSubD || !codigo) {
      return res.status(400).json({ error: 'Parâmetro obrigatório: codigoSecaoSubD, codigoDepartamentoSubD e codigo' });
    }
    const ok = await new DeleteSubDepartamentoService().execute(codigoSecaoSubD, codigoDepartamentoSubD, codigo);
    if (!ok) return res.status(404).json({ error: 'Subdepartamento não encontrado' });
    return res.status(204).send();
  }
}
