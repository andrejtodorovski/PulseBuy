import { Test, TestingModule } from '@nestjs/testing';
import { SystemAnalyticsController } from './system-analytics.controller';
import { SystemAnalyticsService } from './system-analytics.service';

describe('SystemAnalyticsController', () => {
  let controller: SystemAnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemAnalyticsController],
      providers: [SystemAnalyticsService],
    }).compile();

    controller = module.get<SystemAnalyticsController>(SystemAnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
