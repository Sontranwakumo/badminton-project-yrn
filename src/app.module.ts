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
import { EventMqProducerModule } from "./rabbitmq/eventmq-producer.module.js";
import { UtilsModule } from "./commons/utils/utils.module.js";
import { SampleModule } from './v1/sample/sample.module.js';
import { BranchesModule } from "./v1/branches/branches.module.js";
import { OrderFormsModule } from './v1/order-forms/order-forms.module.js';
import { OffScheduleModule } from './v1/off_schedule/off_schedule.module.js';
import { OpenScheduleModule } from './v1/open_schedule/open_schedule.module.js';

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
    UtilsModule,
    SampleModule,
    BranchesModule,
    OrderFormsModule,
    OffScheduleModule,
    OpenScheduleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
