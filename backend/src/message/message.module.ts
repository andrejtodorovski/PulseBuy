import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/models/message.entity';
import { ChatModule } from "../chat/chat.module";
import { MessageEventsService } from "./message-events.service";
import { User } from "../models/user.entity";

@Module({
    imports: [
        ChatModule,
        TypeOrmModule.forFeature([Message, User])
    ],
    providers: [MessageService, MessageEventsService],
    controllers: [MessageController],
    exports: [MessageService],
})
export class MessageModule {
}
