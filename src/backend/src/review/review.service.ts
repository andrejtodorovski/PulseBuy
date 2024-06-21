import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from 'src/models/review.entity';
import { ProductService } from "../product/product.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private productService: ProductService,
    private userService: UsersService
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const product = await this.productService.findOne(createReviewDto.productId);
    const user = await this.userService.findById(createReviewDto.userId);

    if (createReviewDto.rating < 1 || createReviewDto.rating > 5) {
        throw new NotAcceptableException('Rating must be between 1 and 5');
    }

    const alreadyReviewed = await this.reviewRepository.findOne({
      where: {
        product: {id: product.id},
        user: {id: user.id}
      }
    });
    if (alreadyReviewed) {
      throw new NotAcceptableException('You have already reviewed this product')
    }
    const review = this.reviewRepository.create(new Review(product, user, createReviewDto.rating, createReviewDto.comment));
    return await this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return this.reviewRepository.find({ relations: ['product', 'user'] });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id }, relations: ['product', 'user'] });
    if (!review) {
      throw new NotFoundException(`Review #${id} not found`);
    }
    return review;
  }

  async findAllByProduct(productId: number): Promise<Review[]> {
    return this.reviewRepository.find({where: {product: {id: productId}}, relations: ['product', 'user']});
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    await this.reviewRepository.update(id, updateReviewDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reviewRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Review #${id} not found`);
    }
  }
  async getAverageRating(productId: number): Promise<number> {
    const reviews = await this.reviewRepository.find({where: {product: {id: productId}}});
    if (reviews.length === 0) {
      return 0;
    }
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  }
}
