import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntityFields1706372599235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE `user` ADD COLUMN `createdAt` TIMESTAMP DEFAULT NULL");
      await queryRunner.query("UPDATE `user` SET `createdAt` = CURRENT_TIMESTAMP");
      await queryRunner.query("ALTER TABLE `user` ADD COLUMN `firstName` varchar(255) DEFAULT ''");
      await queryRunner.query("ALTER TABLE `user` ADD COLUMN `lastName` varchar(255) DEFAULT ''");
      await queryRunner.query("ALTER TABLE `user` ADD COLUMN `company` varchar(255) DEFAULT ''");
      await queryRunner.query("ALTER TABLE `user` ADD COLUMN `contacts` varchar(255) DEFAULT ''");
      await queryRunner.query("ALTER TABLE `user` ADD COLUMN `about` varchar(255) DEFAULT ''");
      await queryRunner.query("ALTER TABLE `user` ADD COLUMN `imgUrl` varchar(255) DEFAULT ''");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE `user` DROP COLUMN `createdAt`");
      await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstName`");
      await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastName`");
      await queryRunner.query("ALTER TABLE `user` DROP COLUMN `company`");
      await queryRunner.query("ALTER TABLE `user` DROP COLUMN `contacts`");
      await queryRunner.query("ALTER TABLE `user` DROP COLUMN `about`");
      await queryRunner.query("ALTER TABLE `user` DROP COLUMN `imgUrl`");
    }

}
