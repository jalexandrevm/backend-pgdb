import Firebird from 'node-firebird';

const firebirdOptions = {
  host: 'localhost', // ou IP do servidor Firebird
  port: 3050, // porta padrão do Firebird
  database: 'C:/SYSPDV/syspdv_srv.FDB', // caminho absoluto do arquivo .FDB
  user: 'SYSDBA',
  password: 'masterkey',
  lowercase_keys: false, // retorna as chaves dos resultados em minúsculo
  role: null, // ou 'RDB$ADMIN' se necessário
  pageSize: 4096 // tamanho da página do banco
};

export async function TransactionDB(sqlQuerry, params, callback) {
  Firebird.attach(firebirdOptions, async (err, db) => {
    if (err) return callback(err, []);
    db.query(sqlQuerry, params, (err, result) => {
      db.detach();
      if (err) {
        return callback(err, []);
      }
      return callback(null, result);
    });
  });
}
