import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTecnicoTable20250710010601 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "tecnicos",
      columns: [
        { name: "codigo", type: "varchar", length: "6", isPrimary: true },
        { name: "codigoUsuario", type: "varchar", length: "6", isNullable: false },
        { name: "nome", type: "varchar", isNullable: false },
        { name: "titulo", type: "varchar", isNullable: false }
      ],
      uniques: [
        { columnNames: ["nome"] }
      ]
    }));
    await queryRunner.createForeignKey("tecnicos", new TableForeignKey({
      columnNames: ["codigoUsuario"],
      referencedTableName: "usuarios",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT",
      onUpdate: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tecnicos");
  }
}
