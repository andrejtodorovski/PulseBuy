import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlist')
export class WishlistController {
    constructor(private readonly wishlistService: WishlistService) {
    }

    @Post()
    async create(@Body() createWishlistDto: CreateWishlistDto) {
        return await this.wishlistService.create(createWishlistDto);
    }

    @Get(':userId')
    findAllByUserId(@Param('userId') userId: string) {
        return this.wishlistService.findAllByUserId(+userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.wishlistService.remove(+id);
    }
}
