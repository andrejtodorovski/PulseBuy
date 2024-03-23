import { Injectable, Logger, NotAcceptableException, } from '@nestjs/common';
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
  async create(createNewsletterDto: CreateNewsletterDto) {
    const existingNewsletter = await this.newsletterRepositorty.findOne({
      where: {
        email: createNewsletterDto.email,
      },
    });
    if (existingNewsletter) {
      this.logger.error('Email already subscribed to the newsletter');
      throw new NotAcceptableException(
        'Email already subscribed to the newsletter',
      );
    }
    const newsletter = this.newsletterRepositorty.create(createNewsletterDto);
    return this.newsletterRepositorty.save(newsletter);
  }

  findAll() {
    return this.newsletterRepositorty.find();
  }

  remove(id: number) {
    this.newsletterRepositorty.delete(id).then(r => {
      if (r.affected === 0) {
        throw new NotAcceptableException(
            'Email not found in the newsletter list',
        );
      }
      return 'You have been unsubscribed from the newsletter';
    });
  }
}
