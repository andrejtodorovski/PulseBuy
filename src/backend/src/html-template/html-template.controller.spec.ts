import { Test, TestingModule } from '@nestjs/testing';
import { HtmlTemplateController } from './html-template.controller';
import { HtmlTemplateService } from './html-template.service';

describe('HtmlTemplateController', () => {
  let controller: HtmlTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HtmlTemplateController],
      providers: [HtmlTemplateService],
    }).compile();

    controller = module.get<HtmlTemplateController>(HtmlTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
