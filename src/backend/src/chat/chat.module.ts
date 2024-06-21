import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat } from 'src/models/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from "../models/message.entity";
import { User } from "../models/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Message, User])
  ],
  providers: [ChatService],
  controllers: [ChatController ],
  exports: [ChatService],
})
export class ChatModule {}
