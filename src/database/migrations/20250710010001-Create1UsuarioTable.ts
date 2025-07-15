import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class CreateUsuarioTable20250710010001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          {
            name: "codigo",
            type: "varchar",
            length: "6",
            isPrimary: true,
            isNullable: false
          },
          {
            name: "nome",
            type: "varchar",
            isNullable: false
          },
          {
            name: "apelido",
            type: "varchar",
            isNullable: false
          },
          {
            name: "senha",
            type: "varchar",
            isNullable: false
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false
          },
          {
            name: "permissao",
            type: "varchar",
            isNullable: false
          }
        ]
      })
    );
    await queryRunner.createUniqueConstraint(
      "usuarios",
      new TableUnique({
        name: "UQ_usuarios_nome_apelido_email",
        columnNames: ["nome", "apelido", "email"]
      })
    );
    // Valor inicial para usuário admin
    await queryRunner.query(`INSERT INTO usuarios (codigo, nome, apelido, senha, email, permissao) VALUES ('1', 'Admin', 'Admin', 'adm123456', 'admin@adm.com', 'TOTAL')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint("usuarios", "UQ_usuarios_nome_apelido_email");
    await queryRunner.dropTable("usuarios");
  }
}
