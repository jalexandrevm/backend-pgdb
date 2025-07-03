import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStatusTable20250623000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "status",
      columns: [
        {
          name: "codigo",
          type: "varchar",
          length: "3",
          isPrimary: true,
        },
        {
          name: "nome",
          type: "varchar",
          isUnique: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("status");
  }
}
