import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthorToCat1706735704217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create a temporary table cat_backup
    await queryRunner.query('ALTER TABLE "cat" RENAME TO "cat_backup"');

    // Create a new table cat with the addition of authorId
    await queryRunner.query(`
      CREATE TABLE "cat" (
        id integer PRIMARY KEY AUTOINCREMENT,
        name varchar NOT NULL,
        breed varchar NOT NULL,
        imgUrl varchar NOT NULL,
        content varchar NOT NULL,
        age integer NOT NULL,
        createdAt datetime NOT NULL,
        authorId integer,
        FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE
      )
    `);

    // Copy data from the old table to the new one, specifying the columns explicitly
    await queryRunner.query(`
      INSERT INTO "cat" (id, name, breed, imgUrl, content, age, createdAt, authorId)
      SELECT id, name, breed, imgUrl, content, age, createdAt, null FROM "cat_backup"
    `);

    // Delete the temporary table
    await queryRunner.query('DROP TABLE "cat_backup"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Create a temporary table cat_backup
    await queryRunner.query('ALTER TABLE "cat" RENAME TO "cat_backup"');

    // Create a new table cat without the authorId field
    await queryRunner.query(`
      CREATE TABLE "cat" (
        id integer PRIMARY KEY AUTOINCREMENT,
        name varchar NOT NULL,
        breed varchar NOT NULL,
        imgUrl varchar NOT NULL,
        content varchar NOT NULL,
        age integer NOT NULL,
        createdAt datetime NOT NULL
      )
    `);

    // Copy data from the old table to the new one
    await queryRunner.query(`
      INSERT INTO "cat" (id, name, breed, imgUrl, content, age, createdAt)
      SELECT id, name, breed, imgUrl, content, age, createdAt FROM "cat_backup"
    `);

    // Delete the temporary table
    await queryRunner.query('DROP TABLE "cat_backup"');
  }
}
