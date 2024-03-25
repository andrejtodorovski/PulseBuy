import { Test, TestingModule } from '@nestjs/testing';
import { SaleEventsService } from './sale-events.service';

describe('SaleEventsService', () => {
  let service: SaleEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleEventsService],
    }).compile();

    service = module.get<SaleEventsService>(SaleEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
