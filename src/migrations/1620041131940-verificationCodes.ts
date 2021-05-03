import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class verificationCodes1620041131940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "verificationCodes",
        columns: [
          {
            name: "id",
            type: "INT",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "code",
            type: "VARCHAR(4)",
          },
          {
            name: "userId",
            type: "INT",
          },
          {
            name: "expiration_date",
            type: "DATETIME",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "verificationCodes",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const verificationCodes = await queryRunner.getTable("users");
    const userId = verificationCodes?.foreignKeys.find(
      (col) => col.columnNames.indexOf("userId") !== -1
    );

    if (userId) {
      await queryRunner.dropForeignKey("verificationCodes", userId);
    }

    await queryRunner.dropTable("verificationCodes");
  }
}
