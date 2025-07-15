import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmpresaTable20250710010101 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "empresas",
      columns: [
        { name: "codigo", type: "varchar", length: "4", isPrimary: true },
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
        { name: "regime_estadual", type: "varchar", length: "1", isNullable: false },
        { name: "regime_federal", type: "varchar", length: "1", isNullable: false }
      ]
    }));

    // Valor inicial para empresa modelo
    await queryRunner.query(`INSERT INTO empresas (codigo, cnpj_cpf, ie_rg, razao_nome, fantasia_apelido, cep, pais, uf, cidade, logradouro, numero, bairro, complemento, fone1, fone2, email, regime_estadual, regime_federal) VALUES ('1', '01234567890123', 'ISENTO', 'Empresa Modelo', 'Empresa Modelo', '01234567', 'BR', 'DF', 'Brasília', 'Av Principal', '1400', 'Centro', 'S/N', '011987654321', '010987654321', 'admin@adm.com', 'S', 'S')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("empresas");
  }
}
