import 'dotenv/config';
import { exec } from 'child_process';

const args = process.argv.slice(2); // Corrigido para pegar apenas os argumentos após o script
const action = args[0];

let command = '';
if (action === 'run') {
  command = 'ts-node ./node_modules/typeorm/cli.js migration:run -d src/database/db-source.ts';
} else if (action === 'revert') {
  command = 'ts-node ./node_modules/typeorm/cli.js migration:revert -d src/database/db-source.ts';
} else if (action === 'create' && args.length > 1) {
  const migrationName = args[1];
  if (!migrationName) {
    console.error('Por favor, forneça um nome para a migração.');
    process.exit(1);
  }
  // Timestamp no formato YYYYMMDDHHmmss
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const timestamp =
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds());
  command = `ts-node ./node_modules/typeorm/cli.js -t ${timestamp} migration:create src/database/migrations/${migrationName}`;
} else {
  console.error('Uso: npm run migrate:run | migrate:revert | migrate:create -- NomeDaMigration');
  process.exit(1);
}

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});
