import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { ContactService } from 'src/contact/contact.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly mailerService: MailerService,
    private readonly contactService: ContactService,
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
      this.logger.debug('Contact with id: ' + contact.id.toString() + ' sent. The email is: ' + contact.email);
      contact.is_sent = true;
      await this.contactService.contactSent(contact);
      await this.mailerService.sendMail({
        to: contact.email,
        subject: 'Re: ' + contact.subject,
        text: 'Thank you for contacting us. We will get back to you as soon as possible.',
      });
    }
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
