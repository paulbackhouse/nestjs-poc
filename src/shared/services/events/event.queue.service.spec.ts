import { Test, TestingModule } from '@nestjs/testing';
import { EventQueueService } from './event.queue.service';

describe('EventsService', () => {
  let service: EventQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventQueueService],
    }).compile();

    service = module.get<EventQueueService>(EventQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
