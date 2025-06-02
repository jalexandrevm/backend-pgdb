import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientesTable1680000000007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "clientes",
      columns: [
        { name: "codigo", type: "varchar", isPrimary: true },
        { name: "cnpj_cpf", type: "varchar" },
        { name: "ie_rg", type: "varchar" },
        { name: "razao_nome", type: "varchar" },
        { name: "fantasia_apelido", type: "varchar" },
        { name: "cep", type: "varchar" },
        { name: "pais", type: "varchar" },
        { name: "uf", type: "varchar" },
        { name: "cidade", type: "varchar" },
        { name: "logradouro", type: "varchar" },
        { name: "numero", type: "varchar" },
        { name: "bairro", type: "varchar" },
        { name: "complemento", type: "varchar" },
        { name: "fone1", type: "varchar" },
        { name: "fone2", type: "varchar" },
        { name: "email", type: "varchar" },
        { name: "regime_estadual", type: "int" },
        { name: "regime_federal", type: "int" }
      ]
    }));
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clientes");
  }
}
