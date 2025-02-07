import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMqConfigService } from '../config/rabbitmq.config.js';
import { EventMqProducer } from './services/eventmq-producer.service.js';

@Global()
@Module({
  controllers: [],
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useClass: RabbitMqConfigService,
    }),
  ],
  providers: [
    EventMqProducer,
  ],
  exports: [EventMqJobModule],
})
export class EventMqJobModule {}
