import { MigrationInterface, QueryRunner } from "typeorm";

export class InitializeDB1721965225854 implements MigrationInterface {
    name = 'InitializeDB1721965225854'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "default_price" ("id" SERIAL NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "price" integer NOT NULL, "branch_id" uuid, CONSTRAINT "PK_78947f18a6a85a89b05e0be9ec8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "open_schedule" ("id" SERIAL NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "day_of_week" integer NOT NULL, "branch_id" uuid, CONSTRAINT "PK_eb1a0746b0bf881a0699db4b5b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "off_schedules" ("id" SERIAL NOT NULL, "start_time" TIME, "end_time" TIME, "start_date" date NOT NULL, "end_date" date NOT NULL, "loop_week" integer NOT NULL DEFAULT '0', "branch_id" uuid, CONSTRAINT "PK_39f26654ca3a7d61629d657268f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "owner_id" uuid, CONSTRAINT "REL_693a3fa33a821094b69c7c02fe" UNIQUE ("owner_id"), CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "message" character varying NOT NULL, "sender_id" uuid, "court_id" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "court_info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name_of_court" character varying NOT NULL, "description" character varying NOT NULL, "id_branch" uuid NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "is_locked" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_db744655c5284712e508411a39d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_detail" ("id_detail" SERIAL NOT NULL, "amount" integer NOT NULL, "payment_method" character varying NOT NULL, "payment_time" TIMESTAMP NOT NULL DEFAULT now(), "status" boolean NOT NULL DEFAULT false, "id_payment" integer, CONSTRAINT "PK_b1c0f35d6bcf876e0519b274be9" PRIMARY KEY ("id_detail"))`);
        await queryRunner.query(`CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'sent', 'refunded')`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "status" "public"."payment_status_enum" NOT NULL DEFAULT 'pending', "description" character varying, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "time_slot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "match_date" date NOT NULL, "court_id" uuid, "order_id" integer, CONSTRAINT "PK_03f782f8c4af029253f6ad5bacf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."order_form_book_status_enum" AS ENUM('pending', 'approved', 'cancelled')`);
        await queryRunner.query(`CREATE TABLE "order_form" ("id" SERIAL NOT NULL, "sender_id" uuid NOT NULL, "book_status" "public"."order_form_book_status_enum" NOT NULL DEFAULT 'pending', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "note" character varying, "courtId" uuid, "payment_id" integer, CONSTRAINT "REL_7a6bda2c954742a33aaadf06f7" UNIQUE ("payment_id"), CONSTRAINT "PK_8a67a51ec8facd22902fdd8179b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user', 'mod')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "fullname" character varying, "phone" character varying(20) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `);
        await queryRunner.query(`ALTER TABLE "default_price" ADD CONSTRAINT "FK_189c5617ea7d2052942a1012f99" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "open_schedule" ADD CONSTRAINT "FK_7c0bd3469763c438dffcd0957fa" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "off_schedules" ADD CONSTRAINT "FK_256ad8c677242ede79d4a985a99" FOREIGN KEY ("branch_id") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branch" ADD CONSTRAINT "FK_693a3fa33a821094b69c7c02fe8" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_be48703adf8d6e9ba91c3819695" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_4413e0ebe96a5b6349768bdc180" FOREIGN KEY ("court_id") REFERENCES "court_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "court_info" ADD CONSTRAINT "FK_4e28aa30cd2a7d0222d1ae29078" FOREIGN KEY ("id_branch") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_detail" ADD CONSTRAINT "FK_ef2f2e0c8a662108702feedc1ea" FOREIGN KEY ("id_payment") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_slot" ADD CONSTRAINT "FK_e79c99010d4f27d427ae92bde91" FOREIGN KEY ("court_id") REFERENCES "court_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "time_slot" ADD CONSTRAINT "FK_0215f06c9ccadc952845dbe10a3" FOREIGN KEY ("order_id") REFERENCES "order_form"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_form" ADD CONSTRAINT "FK_5c5f9d92b2ab7c7884197ea635c" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_form" ADD CONSTRAINT "FK_b6fd19b2247cc5bbc8485e25602" FOREIGN KEY ("courtId") REFERENCES "court_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_form" ADD CONSTRAINT "FK_7a6bda2c954742a33aaadf06f71" FOREIGN KEY ("payment_id") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_form" DROP CONSTRAINT "FK_7a6bda2c954742a33aaadf06f71"`);
        await queryRunner.query(`ALTER TABLE "order_form" DROP CONSTRAINT "FK_b6fd19b2247cc5bbc8485e25602"`);
        await queryRunner.query(`ALTER TABLE "order_form" DROP CONSTRAINT "FK_5c5f9d92b2ab7c7884197ea635c"`);
        await queryRunner.query(`ALTER TABLE "time_slot" DROP CONSTRAINT "FK_0215f06c9ccadc952845dbe10a3"`);
        await queryRunner.query(`ALTER TABLE "time_slot" DROP CONSTRAINT "FK_e79c99010d4f27d427ae92bde91"`);
        await queryRunner.query(`ALTER TABLE "payment_detail" DROP CONSTRAINT "FK_ef2f2e0c8a662108702feedc1ea"`);
        await queryRunner.query(`ALTER TABLE "court_info" DROP CONSTRAINT "FK_4e28aa30cd2a7d0222d1ae29078"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_4413e0ebe96a5b6349768bdc180"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_be48703adf8d6e9ba91c3819695"`);
        await queryRunner.query(`ALTER TABLE "branch" DROP CONSTRAINT "FK_693a3fa33a821094b69c7c02fe8"`);
        await queryRunner.query(`ALTER TABLE "off_schedules" DROP CONSTRAINT "FK_256ad8c677242ede79d4a985a99"`);
        await queryRunner.query(`ALTER TABLE "open_schedule" DROP CONSTRAINT "FK_7c0bd3469763c438dffcd0957fa"`);
        await queryRunner.query(`ALTER TABLE "default_price" DROP CONSTRAINT "FK_189c5617ea7d2052942a1012f99"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "order_form"`);
        await queryRunner.query(`DROP TYPE "public"."order_form_book_status_enum"`);
        await queryRunner.query(`DROP TABLE "time_slot"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
        await queryRunner.query(`DROP TABLE "payment_detail"`);
        await queryRunner.query(`DROP TABLE "court_info"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "off_schedules"`);
        await queryRunner.query(`DROP TABLE "open_schedule"`);
        await queryRunner.query(`DROP TABLE "default_price"`);
    }

}
