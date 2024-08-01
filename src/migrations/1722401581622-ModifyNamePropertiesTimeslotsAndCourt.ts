import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyNamePropertiesTimeslotsAndCourt1722401581622 implements MigrationInterface {
    name = 'ModifyNamePropertiesTimeslotsAndCourt1722401581622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "court_info" RENAME COLUMN "name_of_court" TO "name"`);
        await queryRunner.query(`ALTER TABLE "branch" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "UQ_d6d14945d4352867ecc62bcf85c" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "time_slot" DROP CONSTRAINT "PK_03f782f8c4af029253f6ad5bacf"`);
        await queryRunner.query(`ALTER TABLE "time_slot" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "time_slot" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "time_slot" ADD CONSTRAINT "PK_03f782f8c4af029253f6ad5bacf" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "time_slot" DROP CONSTRAINT "PK_03f782f8c4af029253f6ad5bacf"`);
        await queryRunner.query(`ALTER TABLE "time_slot" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "time_slot" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "time_slot" ADD CONSTRAINT "PK_03f782f8c4af029253f6ad5bacf" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "UQ_d6d14945d4352867ecc62bcf85c"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "court_info" RENAME COLUMN "name" TO "name_of_court"`);
    }

}
