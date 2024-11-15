import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) {
    }

    @Post()
    create(@Body() createMessageDto: CreateMessageDto) {
        return this.messageService.create(createMessageDto);
    }

    @Get()
    findAll() {
        return this.messageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.messageService.findOne(+id);
    }

    @Get('chat/by-cookie/:cookie')
    findAllMessagesInChatByCookie(@Param('cookie') cookie: string) {
        return this.messageService.findAllMessagesInChatByCookie(cookie);
    }

    @Get('chat/by-user-id/:userId')
    findAllMessagesInChatByUserId(@Param('userId') userId: string) {
        return this.messageService.findAllMessagesInChatByUserId(userId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
        return this.messageService.update(+id, updateMessageDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.messageService.remove(+id);
    }

    @Get('messages-by-chat/:chatId')
    findAllByChatId(@Param('chatId') chatId: string) {
        return this.messageService.findAllByChatId(+chatId);
    }
}
