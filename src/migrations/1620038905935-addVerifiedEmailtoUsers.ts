import { MigrationInterface, QueryRunner } from "typeorm";

export class addVerifiedEmailtoUsers1620038905935
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE users
        ADD COLUMN verified_at DATETIME DEFAULT null AFTER surName
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "verified_at");
  }
}
