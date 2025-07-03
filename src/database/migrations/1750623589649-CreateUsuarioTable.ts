import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class CreateUsuarioTable1750623589649 implements MigrationInterface {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint("usuarios", "UQ_usuarios_nome_apelido_email");
    await queryRunner.dropTable("usuarios");
  }
}
