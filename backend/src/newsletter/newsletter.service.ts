import { HttpException, HttpStatus, Injectable, Logger, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { Newsletter } from 'src/models/newsletter.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);
  constructor(
    @InjectRepository(Newsletter)
    private newsletterRepositorty: Repository<Newsletter>,
  ) {}
  create(createNewsletterDto: CreateNewsletterDto) {
    this.newsletterRepositorty
      .findOne({
        where: {
          email: createNewsletterDto.email,
        },
      })
      .then((res) => {
        if (res) {
          this.logger.error('Email already subscribed to the newsletter');
        } else {
          const newsletter =
            this.newsletterRepositorty.create(createNewsletterDto);
          return this.newsletterRepositorty.save(newsletter);
        }
      });
  }

  findAll() {
    return this.newsletterRepositorty.find();
  }

  remove(id: number) {
    this.newsletterRepositorty.delete(id);
    return 'You have been unsubscribed from the newsletter'
  }
}
