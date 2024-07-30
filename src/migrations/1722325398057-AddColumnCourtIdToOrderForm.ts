import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnCourtIdToOrderForm1722325398057 implements MigrationInterface {
    name = 'AddColumnCourtIdToOrderForm1722325398057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_form" DROP CONSTRAINT "FK_b6fd19b2247cc5bbc8485e25602"`);
        await queryRunner.query(`ALTER TABLE "order_form" RENAME COLUMN "courtId" TO "court_id"`);
        await queryRunner.query(`CREATE TABLE "sample_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_e873152a04c344da778041e482c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_form" ALTER COLUMN "court_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_form" ADD CONSTRAINT "FK_d58173c465d504b6732c9803f3f" FOREIGN KEY ("court_id") REFERENCES "court_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_form" DROP CONSTRAINT "FK_d58173c465d504b6732c9803f3f"`);
        await queryRunner.query(`ALTER TABLE "order_form" ALTER COLUMN "court_id" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "sample_entity"`);
        await queryRunner.query(`ALTER TABLE "order_form" RENAME COLUMN "court_id" TO "courtId"`);
        await queryRunner.query(`ALTER TABLE "order_form" ADD CONSTRAINT "FK_b6fd19b2247cc5bbc8485e25602" FOREIGN KEY ("courtId") REFERENCES "court_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
