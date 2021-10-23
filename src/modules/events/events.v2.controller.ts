import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EventMessageGroup, EventQueue, EventQueueService } from '../../shared/services/events/event.queue.service'
import { v4 as uuid } from 'uuid';
import { EventMessageDto } from './types/EventMessageDto';

@Controller({
    path: 'events',
    version: '2'
})
export class EventsV2Controller {

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
                                queue: EventQueue.goodbye,
                                group: EventMessageGroup.test
                              });
    }
}
