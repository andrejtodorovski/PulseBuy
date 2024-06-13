import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/models/message.entity';
import { ChatModule } from "../chat/chat.module";

@Module({
    imports: [
        ChatModule,
        TypeOrmModule.forFeature([Message])
    ],
    providers: [MessageService],
    controllers: [MessageController],
    exports: [MessageService],
})
export class MessageModule {
}
