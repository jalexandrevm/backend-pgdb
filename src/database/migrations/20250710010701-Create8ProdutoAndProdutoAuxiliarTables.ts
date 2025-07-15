import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProdutoAndProdutoAuxiliarTables20250710010701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Produto
    await queryRunner.createTable(new Table({
      name: "produtos",
      columns: [
        { name: "codigo", type: "varchar", length: "14", isPrimary: true },
        { name: "descricao", type: "varchar", isNullable: false },
        { name: "unidade", type: "varchar", length: "3", default: "'UN'" },
        { name: "precoVenda", type: "decimal", precision: 10, scale: 2, default: 0 },
        { name: "maxDesconto", type: "decimal", precision: 5, scale: 2, default: 0 },
        { name: "precoCusto", type: "decimal", precision: 10, scale: 2, default: 0 },
        { name: "margem", type: "decimal", precision: 5, scale: 2, default: 0 },
        { name: "tipoProduto", type: "varchar", length: "1", default: "'P'" },
        { name: "codigoSecao", type: "varchar", length: "2", isNullable: false },
        { name: "codigoDepartamento", type: "varchar", length: "3", isNullable: true },
        { name: "codigoSubDepartamento", type: "varchar", length: "3", isNullable: true }
      ]
    }));
    await queryRunner.createForeignKey("produtos", new TableForeignKey({
      columnNames: ["codigoSecao"],
      referencedTableName: "secoes",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT",
      onUpdate: "CASCADE"
    }));
    await queryRunner.createForeignKey("produtos", new TableForeignKey({
      columnNames: ["codigoSecao", "codigoDepartamento"],
      referencedTableName: "departamentos",
      referencedColumnNames: ["codigoSecaoDep", "codigo"],
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }));
    await queryRunner.createForeignKey("produtos", new TableForeignKey({
      columnNames: ["codigoSecao", "codigoDepartamento", "codigoSubDepartamento"],
      referencedTableName: "subdepartamentos",
      referencedColumnNames: ["codigoSecaoSubD", "codigoDepartamentoSubD", "codigo"],
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }));

    // ProdutoAuxiliar
    await queryRunner.createTable(new Table({
      name: "produtos_auxiliares",
      columns: [
        { name: "codigoAuxiliar", type: "varchar", length: "20", isPrimary: true },
        { name: "codigoProduto", type: "varchar", length: "14", isNullable: false },
        { name: "fatorMultiplo", type: "decimal", precision: 10, scale: 3, default: 1 },
        { name: "precoAuxiliar", type: "decimal", precision: 10, scale: 2, default: 0 }
      ]
    }));
    await queryRunner.createForeignKey("produtos_auxiliares", new TableForeignKey({
      columnNames: ["codigoProduto"],
      referencedTableName: "produtos",
      referencedColumnNames: ["codigo"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("produtos_auxiliares");
    await queryRunner.dropTable("produtos");
  }
}
