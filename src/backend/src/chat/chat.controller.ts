import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {
    }

    @Post()
    create(@Body() createChatDto: CreateChatDto) {
        return this.chatService.create(createChatDto);
    }

    @Get('/by-cookie/:cookie')
    findOneByCookie(@Param('cookie') cookie: string) {
        return this.chatService.findOneByCookie(cookie);
    }

    @Get('/by-user-id/:userId')
    findOneByUserId(@Param('userId') userId: string) {
        return this.chatService.findOneByUserId(userId);
    }

    @Get("admin-chats")
    getAllChats() {
        return this.chatService.findAll();
    }

}
