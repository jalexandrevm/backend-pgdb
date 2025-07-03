import { Router } from "express";
import { TransactionDB } from "../database/firebird-source";

export const routesSyspdv = Router();

function MakeQuarry(req, res, querry, params = []) {
  TransactionDB(querry, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database connection error\n' + err });
    }
    res.status(200).json(result);
  });
}


routesSyspdv.get('/clientes/:codigo', (req: any, res: any) => {
  const { codigo } = req.params;
  if (!codigo) {
    return res.status(400).json({ error: 'Parâmetro obrigatório: codigo' });
  }
  const sqlQuerry = `select "CLIENTE"."CLICOD" AS "codigo"
     , "CLIENTE"."CLICPFCGC" AS "cnpj_cpf"
     , "CLIENTE"."CLIRGCGF" AS "ie_rg"
     , "CLIENTE"."CLIDES" AS "razao_nome"
     , "CLIENTE"."CLIFAN" AS "fantasia_apelido"
     , "CLIENTE"."CLICEP" AS "cep"
     , "CLIENTE"."CLIPAIS" AS "pais"
     , "CLIENTE"."CLIEST" AS "uf"
     , "CLIENTE"."CLICID" AS "cidade"
     , "CLIENTE"."CLIEND" AS "logradouro"
     , "CLIENTE"."CLINUM" AS "numero"
     , "CLIENTE"."CLIBAI" AS "bairro"
     , "CLIENTE"."CLICMP" AS "complemento"
     , "CLIENTE"."CLITEL" AS "fone1"
     , coalesce("CLIENTE"."CLITEL2", '0123456789012') AS "fone2"
     , coalesce("CLIENTE"."CLIEMAIL", 'sem e-mail') AS "email"
     , "CLIENTE"."CLIPFPJ" AS "pessoa_fisica_juridica"
     , "CLIENTE"."CLISEX" AS "sexo"
from "CLIENTE"
where "CLIENTE"."CLICOD" = ?
ORDER BY "codigo"`;
  MakeQuarry(req, res, sqlQuerry, [codigo]);
});

routesSyspdv.get('/clientes', (req, res) => {
  let pagination = '';
  if (req.body && req.body.pagina && req.body.qtd) {
    const { qtd, pagina } = req.body;
    pagination = `first ${qtd} skip ((${pagina} - 1) * ${qtd}) `;
  }
  const sqlQuerry = `select ${pagination}"CLIENTE"."CLICOD" AS "codigo"
     , "CLIENTE"."CLICPFCGC" AS "cnpj_cpf"
     , "CLIENTE"."CLIRGCGF" AS "ie_rg"
     , "CLIENTE"."CLIDES" AS "razao_nome"
     , "CLIENTE"."CLIFAN" AS "fantasia_apelido"
     , "CLIENTE"."CLICEP" AS "cep"
     , "CLIENTE"."CLIPAIS" AS "pais"
     , "CLIENTE"."CLIEST" AS "uf"
     , "CLIENTE"."CLICID" AS "cidade"
     , "CLIENTE"."CLIEND" AS "logradouro"
     , "CLIENTE"."CLINUM" AS "numero"
     , "CLIENTE"."CLIBAI" AS "bairro"
     , "CLIENTE"."CLICMP" AS "complemento"
     , "CLIENTE"."CLITEL" AS "fone1"
     , coalesce("CLIENTE"."CLITEL2", '0123456789012') AS "fone2"
     , coalesce("CLIENTE"."CLIEMAIL", 'sem e-mail') AS "email"
     , "CLIENTE"."CLIPFPJ" AS "pessoa_fisica_juridica"
     , "CLIENTE"."CLISEX" AS "sexo"
from "CLIENTE"
ORDER BY "codigo"`;
  MakeQuarry(req, res, sqlQuerry);
});

routesSyspdv.get('/proprio', (req, res) => {
  const sqlQuerry = `select "PROPRIO"."PRPCOD" AS "codigo"
     , "PROPRIO"."PRPCGC" AS "cnpj_cpf"
     , "PROPRIO"."PRPIERG" AS "ie_rg"
     , "PROPRIO"."PRPDES" AS "razao_nome"
     , "PROPRIO"."PRPFAN" AS "fantasia_apelido"
     , "PROPRIO"."PRPCEP" AS "cep"
     , "PROPRIO"."PRPPAIS" AS "pais"
     , "PROPRIO"."PRPUF" AS "uf"
     , "PROPRIO"."PRPMUN" AS "cidade"
     , "PROPRIO"."PRPEND" AS "logradouro"
     , "PROPRIO"."PRPNUM" AS "numero"
     , "PROPRIO"."PRPBAI" AS "bairro"
     , "PROPRIO"."PRPCMP" AS "complemento"
     , "PROPRIO"."PRPTEL" AS "fone1"
     , coalesce("PROPRIO"."PRPFAX", '0123456789012') AS "fone2"
     , coalesce("PROPRIO"."PRPEMAIL", 'sem e-mail') AS "email"
     , "PROPRIO"."PRPREGEST" AS "regime_estadual"
     , "PROPRIO"."PRPREGFED" AS "regime_federal"
     , "PROPRIO"."PRPPFPJ" AS "pessoa_fisica_juridica"
from "PROPRIO"`;
  MakeQuarry(req, res, sqlQuerry);
});

routesSyspdv.get('/conta', (req, res) => {
  const sqlQuerry = `SELECT ctccod as "Codigo", ctcdes as "Descricao", ctctip as "Tipo", ctcbanco as "Banco", ctcage as "Agencia", ctcnum as "Conta" FROM conta_corrente order by ctccod`;
  MakeQuarry(req, res, sqlQuerry);
});
