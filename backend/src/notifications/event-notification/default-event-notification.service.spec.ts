import { Test, TestingModule } from '@nestjs/testing';
import { DefaultEventNotificationService } from './default-event-notification.service';

describe('DefaultEventNotificationService', () => {
  let service: DefaultEventNotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultEventNotificationService],
    }).compile();

    service = module.get<DefaultEventNotificationService>(DefaultEventNotificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
