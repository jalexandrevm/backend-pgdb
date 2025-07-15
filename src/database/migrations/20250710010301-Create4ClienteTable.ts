import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClienteTable20250710010301 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "clientes",
      columns: [
        { name: "codigo", type: "varchar", length: "6", isPrimary: true },
        { name: "cnpj_cpf", type: "varchar", length: "14", isNullable: false },
        { name: "ie_rg", type: "varchar", isNullable: false },
        { name: "razao_nome", type: "varchar", isNullable: false },
        { name: "fantasia_apelido", type: "varchar", isNullable: false },
        { name: "cep", type: "varchar", isNullable: false },
        { name: "pais", type: "varchar", isNullable: false },
        { name: "uf", type: "varchar", isNullable: false },
        { name: "cidade", type: "varchar", isNullable: false },
        { name: "logradouro", type: "varchar", isNullable: false },
        { name: "numero", type: "varchar", isNullable: false },
        { name: "bairro", type: "varchar", isNullable: false },
        { name: "complemento", type: "varchar", isNullable: false },
        { name: "fone1", type: "varchar", isNullable: false },
        { name: "fone2", type: "varchar", isNullable: false },
        { name: "email", type: "varchar", isNullable: false },
        { name: "sexo", type: "varchar", length: "1", isNullable: false }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("clientes");
  }
}
