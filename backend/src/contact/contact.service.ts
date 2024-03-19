import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from '../models/contact.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create({
      ...createContactDto,
    });
    return this.contactRepository.save(contact);
  }

  async findAllNotSent(): Promise<Contact[]>{
    return this.contactRepository.find({
      where: {
        is_sent: false,
      },
    });
  }

  async contactSent(contact: Contact): Promise<Contact> {
    contact.is_sent = true;
    return this.contactRepository.save(contact);
  }
}
