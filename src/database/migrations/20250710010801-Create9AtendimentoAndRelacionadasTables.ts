import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAtendimentoAndRelacionadasTables20250710010801 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Atendimento
    await queryRunner.createTable(new Table({
      name: "atendimentos",
      columns: [
        { name: "codigo", type: "varchar", length: "10", isPrimary: true },
        { name: "codigoEmpresa", type: "varchar", length: "4", isNullable: false },
        { name: "codigoUsuario", type: "varchar", length: "6", isNullable: false },
        { name: "codigoCliente", type: "varchar", length: "6", isNullable: false },
        { name: "dataAbertura", type: "timestamp", isNullable: false },
        { name: "dataFechamento", type: "timestamp", isNullable: true, default: null },
        { name: "codigoStatus", type: "varchar", length: "3", isNullable: false },
        { name: "codigoSituacao", type: "varchar", length: "3", isNullable: false },
        { name: "problemaInformado", type: "varchar", isNullable: false },
        { name: "valorPecas", type: "decimal", precision: 10, scale: 2, default: 0 },
        { name: "valorServicos", type: "decimal", precision: 10, scale: 2, default: 0 },
        { name: "valorDesconto", type: "decimal", precision: 10, scale: 2, default: 0 },
        { name: "valorAtende", type: "decimal", precision: 10, scale: 2, default: 0 }
      ]
    }));
    await queryRunner.createForeignKey("atendimentos", new TableForeignKey({
      columnNames: ["codigoEmpresa"],
      referencedTableName: "empresas",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT"
    }));
    await queryRunner.createForeignKey("atendimentos", new TableForeignKey({
      columnNames: ["codigoUsuario"],
      referencedTableName: "usuarios",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT"
    }));
    await queryRunner.createForeignKey("atendimentos", new TableForeignKey({
      columnNames: ["codigoCliente"],
      referencedTableName: "clientes",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT"
    }));
    await queryRunner.createForeignKey("atendimentos", new TableForeignKey({
      columnNames: ["codigoStatus"],
      referencedTableName: "status",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT"
    }));
    await queryRunner.createForeignKey("atendimentos", new TableForeignKey({
      columnNames: ["codigoStatus", "codigoSituacao"],
      referencedTableName: "situacoes",
      referencedColumnNames: ["codigoStatus", "codigo"],
      onDelete: "RESTRICT"
    }));

    // AtendimentoInteracao
    await queryRunner.createTable(new Table({
      name: "atendimento_interacoes",
      columns: [
        { name: "codigo", type: "varchar", length: "10", isPrimary: true },
        { name: "codigoAtendimento", type: "varchar", length: "10", isNullable: false },
        { name: "posicao", type: "int", isNullable: false },
        { name: "codigoTecnico", type: "varchar", length: "6", isNullable: false },
        { name: "dataInteracao", type: "timestamp", isNullable: false },
        { name: "codigoStatus", type: "varchar", length: "3", isNullable: false },
        { name: "codigoSituacao", type: "varchar", length: "3", isNullable: false },
        { name: "textoDescricao", type: "varchar", isNullable: false }
      ]
    }));
    await queryRunner.createForeignKey("atendimento_interacoes", new TableForeignKey({
      columnNames: ["codigoAtendimento"],
      referencedTableName: "atendimentos",
      referencedColumnNames: ["codigo"],
      onDelete: "CASCADE"
    }));
    await queryRunner.createForeignKey("atendimento_interacoes", new TableForeignKey({
      columnNames: ["codigoTecnico"],
      referencedTableName: "tecnicos",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT"
    }));
    await queryRunner.createForeignKey("atendimento_interacoes", new TableForeignKey({
      columnNames: ["codigoStatus"],
      referencedTableName: "status",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT"
    }));
    await queryRunner.createForeignKey("atendimento_interacoes", new TableForeignKey({
      columnNames: ["codigoStatus", "codigoSituacao"],
      referencedTableName: "situacoes",
      referencedColumnNames: ["codigoStatus", "codigo"],
      onDelete: "RESTRICT"
    }));

    // AtendimentoProduto
    await queryRunner.createTable(new Table({
      name: "atendimentos_produtos",
      columns: [
        { name: "codigo", type: "varchar", length: "10", isPrimary: true },
        { name: "codigoAtendimento", type: "varchar", length: "10", isNullable: false },
        { name: "codigoUsuario", type: "varchar", length: "6", isNullable: false },
        { name: "dataInclusao", type: "timestamp", isNullable: false },
        { name: "tipoProduto", type: "varchar", length: "1", isNullable: false },
        { name: "posicao", type: "int", isNullable: false },
        { name: "codigoProduto", type: "varchar", length: "14", isNullable: false },
        { name: "qtd", type: "decimal", precision: 10, scale: 3, isNullable: false },
        { name: "unidade", type: "varchar", length: "3", isNullable: false },
        { name: "vlrUnit", type: "decimal", precision: 10, scale: 2, isNullable: false },
        { name: "vlrTotal", type: "decimal", precision: 10, scale: 2, isNullable: false },
        { name: "codigoAuxiliar", type: "varchar", length: "20", isNullable: true, default: null },
        { name: "vlrCusto", type: "decimal", precision: 10, scale: 2, isNullable: false },
        { name: "observacao", type: "text", isNullable: true }
      ]
    }));
    await queryRunner.createForeignKey("atendimentos_produtos", new TableForeignKey({
      columnNames: ["codigoAtendimento"],
      referencedTableName: "atendimentos",
      referencedColumnNames: ["codigo"],
      onDelete: "CASCADE"
    }));
    await queryRunner.createForeignKey("atendimentos_produtos", new TableForeignKey({
      columnNames: ["codigoUsuario"],
      referencedTableName: "usuarios",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT"
    }));
    await queryRunner.createForeignKey("atendimentos_produtos", new TableForeignKey({
      columnNames: ["codigoProduto"],
      referencedTableName: "produtos",
      referencedColumnNames: ["codigo"],
      onDelete: "RESTRICT"
    }));
    await queryRunner.createForeignKey("atendimentos_produtos", new TableForeignKey({
      columnNames: ["codigoAuxiliar"],
      referencedTableName: "produtos_auxiliares",
      referencedColumnNames: ["codigoAuxiliar"],
      onDelete: "SET NULL"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("atendimentos_produtos");
    await queryRunner.dropTable("atendimento_interacoes");
    await queryRunner.dropTable("atendimentos");
  }
}
