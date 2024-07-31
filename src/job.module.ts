import { RedisModule } from "@liaoliaots/nestjs-redis";
import { BullModule } from "@nestjs/bull";
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppLoggerMiddleware } from "./commons/middlewares/app-logger.middleware.js";
import { BullConfigService } from "./config/bull.config.js";
import { configuration } from "./config/config.js";
import { DatabaseConfigService } from "./config/database.config.js";
import { RedisConfigService } from "./config/redis.config.js";
import { SCRIPTS } from "./scripts/index.js";
import { EventMqAppModule } from "./rabbitmq/eventmq-app.module.js";
import { EventMqProducerModule } from "./rabbitmq/eventmq-producer.module.js";
import { CourtInfo } from "./entities/court_info.entity.js";
import { Branch } from "./entities/branch.entity.js";
import { User } from "./entities/user.entity.js";
import { OrderForm } from "./entities/order_form.entity.js";
import { DefaultPrice } from "./entities/default_price.entity.js";
import { OffSchedules } from "./entities/off_schedule.entity.js";
import { OpenSchedule } from "./entities/open_schedule.entity.js";
import { Payment } from "./entities/payment.entity.js";
import { PaymentDetail } from "./entities/payment_detail.entity.js";
import { TimeSlot } from "./entities/timeslot.entity.js";
import { Comment } from "./entities/comment.entity.js";
const imports = [
  // TypeOrmModule.forFeature([
  //   Branch,
  //   CourtInfo,
  //   User,
  //   OrderForm,
  //   DefaultPrice,
  //   OffSchedules,
  //   OpenSchedule,
  //   Payment,
  //   PaymentDetail,
  //   Comment,
  //   TimeSlot,
  // ]),
];
if (process.env.RABBITMQ_MODE === "true") {
  // imports.push(EventMqAppModule);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConfigService,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useClass: BullConfigService,
      inject: [ConfigService],
    }),
    TerminusModule,
    EventMqProducerModule,
    ...imports
  ],
  controllers: [],
  providers: [...SCRIPTS],
})
export class JobModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
