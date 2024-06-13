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
        let chat;
        if (createChatDto.cookie != null) {
            chat = this.chatRepository.create({
                cookie: createChatDto.cookie
            });
        } else {
            chat = this.chatRepository.create({
                userId: createChatDto.userId
            });
        }
        return this.chatRepository.save(chat);
    }

    async findAll(): Promise<Chat[]> {
        return this.chatRepository.find();
    }

    async findOneByCookie(cookie: string): Promise<Chat> {
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

    async findOneByUserId(userId: string): Promise<Chat> {
        const chat = await this.chatRepository.findOne({
            where: {
                userId: userId
            }
        });
        if (!chat) {
            throw new NotFoundException(`Chat with userId: #${userId} not found`);
        }
        return chat;
    }

    async getOrCreateChatByCookie(cookie: string): Promise<Chat> {
        let chat = await this.chatRepository.findOne({where: {cookie}});
        if (!chat) {
            chat = this.chatRepository.create({
                cookie: cookie,
                userId: null
            });
            chat = await this.chatRepository.save(chat);
        }
        return chat;
    }

    async getOrCreateChatByUserId(userId: string): Promise<Chat> {
        let chat = await this.chatRepository.findOne({where: {userId}});
        if (!chat) {
            chat = this.chatRepository.create({
                cookie: null,
                userId: userId
            });
            chat = await this.chatRepository.save(chat);
        }
        return chat;
    }
}
