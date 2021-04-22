import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1619091708116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "INT",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          },
          {
            name: "email",
            type: "VARCHAR(50)",
            isNullable: false,
          },
          {
            name: "password",
            type: "VARCHAR(50)",
            isNullable: false,
          },
          {
            name: "firstName",
            type: "VARCHAR(15)",
            isNullable: false,
          },
          {
            name: "surName",
            type: "VARCHAR(50)",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "DATETIME",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "DATETIME",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
