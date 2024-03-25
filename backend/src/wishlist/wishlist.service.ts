import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Wishlist } from "../models/wishlist.entity";
import { Repository } from "typeorm";
import { ProductService } from "../product/product.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class WishlistService {
    constructor(
        @InjectRepository(Wishlist)
        private wishlistRepository: Repository<Wishlist>,
        private productService: ProductService,
        private userService: UsersService
    ) {
    }

    async create(createWishlistDto: CreateWishlistDto) {
        const product = await this.productService.findOne(createWishlistDto.productId);
        const user = await this.userService.findById(createWishlistDto.userId);
        const alreadyOnWishlist = await this.wishlistRepository.findOne({
            where: {
                product: {id: product.id},
                user: {id: user.id}
            }
        });
        if (alreadyOnWishlist) {
            throw new NotAcceptableException('Product already on wishlist')
        }
        const wishlist = this.wishlistRepository.create(new Wishlist(user, product));
        return await this.wishlistRepository.save(wishlist);
    }

    async findAllByUserId(userId: number) {
        const wishlistItems = await this.wishlistRepository.find({
            where: {user: {id: userId}},
            relations: ['product', 'user']
        });
        return wishlistItems.map(wishlistItem => {
            return {
                id: wishlistItem.id,
                product: wishlistItem.product,
            }
        });
    }

    remove(id: number) {
        return this.wishlistRepository.delete(id);
    }
}
