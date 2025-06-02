import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSituacoesTable1680000000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "situacoes",
      columns: [
        { name: "codigo", type: "varchar", isPrimary: true },
        { name: "nome", type: "varchar" },
        { name: "ordem", type: "varchar" },
        { name: "status_codigo", type: "varchar" },
        { name: "cor", type: "varchar" }
      ]
    }));
    await queryRunner.createForeignKey(
      "situacoes",
      new TableForeignKey({
        columnNames: ["status_codigo"],
        referencedTableName: "status",
        referencedColumnNames: ["codigo"],
        onDelete: "CASCADE"
      })
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("situacoes");
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("status_codigo") !== -1);
    if (foreignKey) await queryRunner.dropForeignKey("situacoes", foreignKey);
    await queryRunner.dropTable("situacoes");
  }
}
