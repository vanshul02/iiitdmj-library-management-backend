import { MigrationInterface, QueryRunner } from "typeorm"

export class CategoryMigration1685387301734 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO category VALUES 
            (1, 'E-Book', now(), now()), 
            (2, 'Sci-Fi', now(), now()), 
            (3, 'Horror', now(), now())
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM category WHERE id in (1, 2, 3)`);
    }

}
