import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { ContactService } from 'src/contact/contact.service';
import { NewsletterService } from 'src/newsletter/newsletter.service';
import { Newsletter } from 'src/models/newsletter.entity';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly mailerService: MailerService,
    private readonly contactService: ContactService,
    private readonly newsletterService: NewsletterService,
    private readonly productService: ProductService
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleUnsentContacts() {
    this.logger.debug('Sending unsent contacts');
    const contacts = await this.contactService.findAllNotSent();
    this.logger.debug(
      'Number of unsent contacts: ' + contacts.length.toString(),
    );
    for (const contact of contacts) {
      await this.sendContactToDevelopers(contact);
      this.logger.debug(
        'Contact with id: ' +
          contact.id.toString() +
          ' sent. The email is: ' +
          contact.email,
      );
      contact.is_sent = true;
      await this.contactService.contactSent(contact);
      await this.mailerService.sendMail({
        to: contact.email,
        subject: 'Re: ' + contact.subject,
        text: 'Thank you for contacting us. We will get back to you as soon as possible.',
      });
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleNewsletter() {
    this.logger.debug('Sending newsletter');
    const subscribers = await this.newsletterService.findAll();
    this.logger.debug(
      'Number of subscribers: ' + subscribers.length.toString(),
    );
    for (const subscriber of subscribers) {
      await this.mailerService.sendMail({
        to: subscriber.email,
        subject: 'Newsletter',
        text: await this.generateNewsletter(subscriber),
      });
    }
  }

  private async generateNewsletter(subscriber: Newsletter) {
    const unsubscribeMessage =
      'If you want to unsubscribe, click on the link below: http://localhost:3000/newsletter/unsubscribe/' +
      subscriber.id.toString() +
      ' .';
    const productsAddedInLast24Hours = await this.productService.findAllProductsAddedInLast24Hours();
    let newProductsInTheShop = '';
    for (const product of productsAddedInLast24Hours) {
      newProductsInTheShop +=
        product.name + ' ' + product.price + ' ' + product.description + '\n';
    }
    const finalString = 'Hello ' + subscriber.email + '!' + '\n' + 'We have new products in our shop. Check them out!' + '\n' + newProductsInTheShop + '\n' + unsubscribeMessage;
    return finalString;
  }

  private async sendContactToDevelopers(contact: any) {
    const developers = [
      'andrejtodorovski5@gmail.com',
      'bojantrpeski123@gmail.com',
      'darko.sasanski@gmail.com',
    ];
    for (const developer of developers) {
      await this.mailerService.sendMail({
        to: developer,
        subject: contact.subject + ' from: ' + contact.email,
        text: contact.message,
      });
    }
  }
}
