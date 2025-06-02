import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProdutosTable1680000000006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "produtos",
      columns: [
        { name: "codigo", type: "varchar", isPrimary: true },
        { name: "descricao", type: "varchar" },
        { name: "preco", type: "varchar" }
      ]
    }));
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("produtos");
  }
}
