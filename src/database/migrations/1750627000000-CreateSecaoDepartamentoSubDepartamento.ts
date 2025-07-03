import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSecaoDepartamentoSubDepartamento1750627000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Secao
    await queryRunner.createTable(new Table({
      name: "secoes",
      columns: [
        { name: "codigo", type: "varchar", length: "2", isPrimary: true },
        { name: "descricao", type: "varchar", isNullable: false }
      ]
    }));

    // Departamento
    await queryRunner.createTable(new Table({
      name: "departamentos",
      columns: [
        { name: "codigoSecaoDep", type: "varchar", length: "2", isPrimary: true },
        { name: "codigo", type: "varchar", length: "3", isPrimary: true },
        { name: "descricao", type: "varchar", isNullable: false }
      ]
    }));
    await queryRunner.createForeignKey("departamentos", new TableForeignKey({
      columnNames: ["codigoSecaoDep"],
      referencedTableName: "secoes",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT",
      onUpdate: "CASCADE"
    }));

    // SubDepartamento
    await queryRunner.createTable(new Table({
      name: "subdepartamentos",
      columns: [
        { name: "codigoSecaoSubD", type: "varchar", length: "2", isPrimary: true },
        { name: "codigoDepartamentoSubD", type: "varchar", length: "3", isPrimary: true },
        { name: "codigo", type: "varchar", length: "3", isPrimary: true },
        { name: "descricao", type: "varchar", isNullable: false }
      ]
    }));
    await queryRunner.createForeignKey("subdepartamentos", new TableForeignKey({
      columnNames: ["codigoSecaoSubD"],
      referencedTableName: "secoes",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT",
      onUpdate: "CASCADE"
    }));
    await queryRunner.createForeignKey("subdepartamentos", new TableForeignKey({
      columnNames: ["codigoSecaoSubD", "codigoDepartamentoSubD"],
      referencedTableName: "departamentos",
      referencedColumnNames: ["codigoSecaoDep", "codigo"],
      onDelete: "RESTRICT",
      onUpdate: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("subdepartamentos");
    await queryRunner.dropTable("departamentos");
    await queryRunner.dropTable("secoes");
  }
}
