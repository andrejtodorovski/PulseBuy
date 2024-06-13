import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from 'src/models/message.entity';
import { ChatService } from "../chat/chat.service";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        private chatService: ChatService
    ) {
    }

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        let chat;
        if (createMessageDto.cookie != null) {
            chat = await this.chatService.getOrCreateChatByCookie(createMessageDto.cookie);
        } else {
            chat = await this.chatService.getOrCreateChatByUserId(createMessageDto.userId);
        }
        const message = this.messageRepository.create({
            content: createMessageDto.content,
            chat
        });
        return this.messageRepository.save(message);
    }

    async findAll(): Promise<Message[]> {
        return this.messageRepository.find({relations: ['chat']});
    }

    async findOne(id: number): Promise<Message> {
        const message = await this.messageRepository.findOne({where: {id}, relations: ['chat']});
        if (!message) {
            throw new NotFoundException(`Message #${id} not found`);
        }
        return message;
    }

    async findAllMessagesInChatByCookie(cookie: string): Promise<Message[]> {
        const chat = await this.chatService.getOrCreateChatByCookie(cookie);
        return this.messageRepository.find({where: {chat}, relations: ['chat']});
    }

    async findAllMessagesInChatByUserId(userId: string): Promise<Message[]> {
        const chat = await this.chatService.getOrCreateChatByUserId(userId);
        return this.messageRepository.find({where: {chat}, relations: ['chat']});
    }

    async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
        const result = await this.messageRepository.update(id, updateMessageDto);
        if (result.affected === 0) {
            throw new NotFoundException(`Message #${id} not found`);
        }
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const result = await this.messageRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Message #${id} not found`);
        }
    }
}
