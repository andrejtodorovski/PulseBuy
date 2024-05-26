import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/models/message.entity';
import { ChatService } from "../chat/chat.service";
import { Chat } from "../models/chat.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Chat])
  ],
  providers: [MessageService, ChatService],
  controllers: [MessageController ],
  exports: [MessageService],
})
export class MessageModule {}
