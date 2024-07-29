import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCourtInfoAndOpenSchedule1721984938973 implements MigrationInterface {
    name = 'UpdateCourtInfoAndOpenSchedule1721984938973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "court_info" DROP COLUMN "is_locked"`);
        await queryRunner.query(`ALTER TABLE "court_info" DROP COLUMN "is_active"`);
        await queryRunner.query(`CREATE TYPE "public"."court_info_status_enum" AS ENUM('locked', 'active', 'deactivate')`);
        await queryRunner.query(`ALTER TABLE "court_info" ADD "status" "public"."court_info_status_enum" NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "open_schedule" ALTER COLUMN "start_time" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "open_schedule" ALTER COLUMN "end_time" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "open_schedule" ALTER COLUMN "end_time" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "open_schedule" ALTER COLUMN "start_time" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "court_info" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."court_info_status_enum"`);
        await queryRunner.query(`ALTER TABLE "court_info" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "court_info" ADD "is_locked" boolean NOT NULL DEFAULT false`);
    }

}
