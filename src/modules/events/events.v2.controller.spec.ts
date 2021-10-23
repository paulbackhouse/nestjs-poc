import { Test, TestingModule } from '@nestjs/testing';
import { EventsV2Controller } from './events.v2.controller';

describe('EventsV2Controller', () => {
  let controller: EventsV2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsV2Controller],
    }).compile();

    controller = module.get<EventsV2Controller>(EventsV2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
