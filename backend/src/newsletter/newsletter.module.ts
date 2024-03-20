import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { Newsletter } from 'src/models/newsletter.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Newsletter])
  ],
  exports: [NewsletterService],
  controllers: [NewsletterController],
  providers: [NewsletterService],
})
export class NewsletterModule {}
