import { Body, Controller, HttpCode, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { EventMessageGroup, EventQueue, EventQueueService } from '../../shared/services/events/event.queue.service'
import { v4 as uuid } from 'uuid';
import { EventMessageDto } from './types/EventMessageDto';


@Controller({
  path:'events',
  version: '1'
})
export class EventsController {
  constructor(
    private readonly eventQueueService: EventQueueService,
    ) 
  {}

  @Post()
  @HttpCode(202)
  async publishEvent(@Body() eventMessage: EventMessageDto) : Promise<void> {
    await this.eventQueueService.publish({
                              messageBody: eventMessage.message,
                              id: uuid(),
                              queue: EventQueue.hello,
                              group: EventMessageGroup.test
                            });
  }
}
