import {Test, TestingModule} from '@nestjs/testing';
import {ProductEventsService} from './product-events.service';

describe('ProductEventsService', () => {
    let service: ProductEventsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductEventsService],
        }).compile();

        service = module.get<ProductEventsService>(ProductEventsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
