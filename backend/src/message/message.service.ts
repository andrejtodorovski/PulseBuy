import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from 'src/models/message.entity';
import { ChatService } from "../chat/chat.service";
import { MessageResponse } from "./dto/message-response";
import { MessageSentByAdminEvent, MessageSentByUserEvent } from "./events/message.event";
import { User } from "../models/user.entity";
import { MessageEventsService } from "./message-events.service";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private chatService: ChatService,
        private messageEventsService: MessageEventsService
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
            chat: chat,
            isAdminReply: createMessageDto.isAdminReply
        });
        let user;
        if (chat.userId != null) {
            user = await this.userRepository.findOne({
                where: {
                    id: +chat.userId
                }
            });
        } else {
            user = null;
        }
        if (!createMessageDto.isAdminReply) {
            const messageSentByUserEvent = new MessageSentByUserEvent(chat.id, user ? user.fullName : 'Anonymous user');
            this.messageEventsService.emitEvent(messageSentByUserEvent);
        } else {
            if (chat.userId != null) {
                const messageSentByAdminEvent = new MessageSentByAdminEvent(chat.id, chat.userId);
                this.messageEventsService.emitEvent(messageSentByAdminEvent);
            }
        }
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

    async findAllByChatId(chatId: number): Promise<MessageResponse[]> {
        const messages = await this.messageRepository.find({
            relations: ['chat'],
            where: {
                chat: {
                    id: chatId
                }
            }
        });
        return messages.map(message => {
            return new MessageResponse(
                message.chat.id,
                message.content,
                message.isAdminReply
            )
        })

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
