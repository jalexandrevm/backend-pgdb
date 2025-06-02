import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsuariosTable1680000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "usuarios",
      columns: [
        { name: "codigo", type: "varchar", isPrimary: true },
        { name: "nome", type: "varchar" },
        { name: "apelido", type: "varchar" },
        { name: "senha", type: "varchar" },
        { name: "email", type: "varchar" },
        { name: "permissao", type: "varchar" }
      ]
    }));
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios");
  }
}
