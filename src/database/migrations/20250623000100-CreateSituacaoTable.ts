import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSituacaoTable20250623000100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "situacoes",
      columns: [
        {
          name: "codigoStatus",
          type: "varchar",
          length: "3",
          isPrimary: true,
        },
        {
          name: "codigo",
          type: "varchar",
          length: "3",
          isPrimary: true,
        },
        {
          name: "nome",
          type: "varchar",
        },
        {
          name: "ordem",
          type: "int",
        },
        {
          name: "cor",
          type: "varchar",
          isNullable: true,
        },
      ],
    }));
    await queryRunner.createForeignKey(
      "situacoes",
      new TableForeignKey({
        columnNames: ["codigoStatus"],
        referencedTableName: "status",
        referencedColumnNames: ["codigo"],
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("situacoes");
  }
}
