import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from 'src/models/chat.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat)
        private chatRepository: Repository<Chat>,
    ) {
    }

    async create(createChatDto: CreateChatDto): Promise<Chat> {
        const chat = this.chatRepository.create({
            cookie: createChatDto.cookie,
        });
        return this.chatRepository.save(chat);
    }

    async findAll(): Promise<Chat[]> {
        return this.chatRepository.find();
    }

    async findOne(cookie: string): Promise<Chat> {
        const chat = await this.chatRepository.findOne({
            where: {
                cookie: cookie
            }
        });
        if (!chat) {
            throw new NotFoundException(`Chat with cookie: #${cookie} not found`);
        }
        return chat;
    }

    async getOrCreateChat(cookie: string): Promise<Chat> {
        let chat = await this.chatRepository.findOne({ where: { cookie } });
        if (!chat) {
            chat = this.chatRepository.create({ cookie });
            chat = await this.chatRepository.save(chat);
        }
        return chat;
    }
}
