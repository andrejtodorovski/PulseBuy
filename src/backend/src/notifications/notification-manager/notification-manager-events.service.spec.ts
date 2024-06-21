import { Test, TestingModule } from '@nestjs/testing';
import { NotificationManagerEventsService } from './notification-manager-events.service';

describe('NotificationManagerEventsService', () => {
  let service: NotificationManagerEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationManagerEventsService],
    }).compile();

    service = module.get<NotificationManagerEventsService>(NotificationManagerEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
