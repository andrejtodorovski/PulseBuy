import { Controller, Post } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Controller('cookie')
export class CookieController {
    @Post()
    createCookie() {
        return {
            value: uuidv4(),
            expiry: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
        }
    }
}
