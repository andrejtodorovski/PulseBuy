import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { Chat } from 'src/models/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat])
  ],
  providers: [ChatService],
  controllers: [ChatController ],
  exports: [ChatService],
})
export class ChatModule {}
