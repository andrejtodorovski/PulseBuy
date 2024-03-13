import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat/chat.gateway';
import { ProductModule } from './product/product.module';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { ReviewModule } from './review/review.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'bt',
          database: 'pulsebuy',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('No options provided');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    CartModule,
    CategoryModule,
    ReviewModule,
    CartItemModule,
    MessageModule,
    ChatModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
