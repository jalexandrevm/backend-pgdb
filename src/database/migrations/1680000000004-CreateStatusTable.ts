import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStatusTable1680000000004 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "status",
      columns: [
        { name: "codigo", type: "varchar", isPrimary: true },
        { name: "nome", type: "varchar" },
        { name: "ordem", type: "varchar" },
        { name: "cor", type: "varchar" }
      ]
    }));
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("status");
  }
}
