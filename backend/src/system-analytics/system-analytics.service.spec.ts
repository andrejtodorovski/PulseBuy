import { Test, TestingModule } from '@nestjs/testing';
import { SystemAnalyticsService } from './system-analytics.service';

describe('SystemAnalyticsService', () => {
  let service: SystemAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemAnalyticsService],
    }).compile();

    service = module.get<SystemAnalyticsService>(SystemAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
