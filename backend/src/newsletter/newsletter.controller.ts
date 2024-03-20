import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post()
  create(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newsletterService.create(createNewsletterDto);
  }

  @Get()
  findAll() {
    return this.newsletterService.findAll();
  }

  @Get('unsubscribe/:id')
  remove(@Param('id') id: string) {
    return this.newsletterService.remove(+id);
  }
}
