import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCourtIDToTimeslotEntity1722390732290 implements MigrationInterface {
    name = 'AddCourtIDToTimeslotEntity1722390732290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_slot" DROP CONSTRAINT "FK_e79c99010d4f27d427ae92bde91"`);
        await queryRunner.query(`ALTER TABLE "time_slot" ALTER COLUMN "court_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_slot" ADD CONSTRAINT "FK_e79c99010d4f27d427ae92bde91" FOREIGN KEY ("court_id") REFERENCES "court_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_slot" DROP CONSTRAINT "FK_e79c99010d4f27d427ae92bde91"`);
        await queryRunner.query(`ALTER TABLE "time_slot" ALTER COLUMN "court_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_slot" ADD CONSTRAINT "FK_e79c99010d4f27d427ae92bde91" FOREIGN KEY ("court_id") REFERENCES "court_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
