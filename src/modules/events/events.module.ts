import { Module } from '@nestjs/common';
import  { EventsController } from './events.controller'
import {LoggerService } from '../../shared/services/logger.service'
import { EventQueueService } from '../../shared/services/events/event.queue.service';
import { EventsV2Controller } from './events.v2.controller';

@Module({
  controllers: [EventsController, EventsV2Controller],
  providers: [LoggerService, EventQueueService]
})
export class EventsModule {}
