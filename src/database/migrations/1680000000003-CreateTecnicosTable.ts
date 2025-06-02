import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTecnicosTable1680000000003 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "tecnicos",
      columns: [
        { name: "codigo", type: "varchar", isPrimary: true },
        { name: "nome", type: "varchar" },
        { name: "email", type: "varchar" },
        { name: "titulo", type: "varchar" }
      ]
    }));
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tecnicos");
  }
}
