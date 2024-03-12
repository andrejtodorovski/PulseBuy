import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from 'src/models/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatDto): Promise<Chat> {
    const chat = this.chatRepository.create({
      sender: { id: createChatDto.senderId },
      receiver: { id: createChatDto.receiverId },
    });
    return this.chatRepository.save(chat);
  }

  async findAll(): Promise<Chat[]> {
    return this.chatRepository.find({ relations: ['sender', 'receiver'] });
  }

  async findOne(id: number): Promise<Chat> {
    const chat = await this.chatRepository.findOne({ where: { id }, relations: ['sender', 'receiver'] });
    if (!chat) {
      throw new NotFoundException(`Chat #${id} not found`);
    }
    return chat;
  }

  async update(id: number, updateChatDto: UpdateChatDto): Promise<Chat> {
    await this.chatRepository.update(id, {
      sender: updateChatDto.senderId ? { id: updateChatDto.senderId } : undefined,
      receiver: updateChatDto.receiverId ? { id: updateChatDto.receiverId } : undefined,
    });
    const updatedChat = await this.findOne(id);
    if (!updatedChat) {
      throw new NotFoundException(`Chat #${id} not found`);
    }
    return updatedChat;
  }

  async remove(id: number): Promise<void> {
    const result = await this.chatRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Chat #${id} not found`);
    }
  }
}
