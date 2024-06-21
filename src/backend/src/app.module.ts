import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ProductModule } from "./product/product.module";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";
import { CategoryModule } from "./category/category.module";
import { CartModule } from "./cart/cart.module";
import { ReviewModule } from "./review/review.module";
import { CartItemModule } from "./cart-item/cart-item.module";
import { MessageModule } from "./message/message.module";
import { ChatModule } from "./chat/chat.module";
import { SocketModule } from "./socket/socket.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { EventsModule } from "./events/events.module";
import { ContactModule } from "./contact/contact.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksModule } from "./tasks/tasks.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { NewsletterModule } from "./newsletter/newsletter.module";
import { SaleModule } from "./sale/sale.module";
import { SaleEventsService } from "./sale/sale-events.service";
import { WishlistModule } from "./wishlist/wishlist.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { HtmlTemplateModule } from "./html-template/html-template.module";
import * as process from "process";
import { CookieController } from "./cookie/cookie.controller";

@Module({
  imports: [
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: true,
      // the delimiter used to segment namespaces
      delimiter: ".",
      // set this to `true` if you want to emit the newListener event
      newListener: false,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false
    }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: "postgres",
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: true
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error("No options provided");
        }
        return addTransactionalDataSource(new DataSource(options));
      }
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    CartModule,
    CategoryModule,
    ReviewModule,
    CartItemModule,
    MessageModule,
    ChatModule,
    ReviewModule,
    SocketModule,
    EventsModule,
    ContactModule,
    ScheduleModule.forRoot(),
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: configService.get("MAIL_USER"),
            pass: configService.get("PASSWORD"),
            jwt: configService.get("JWT_SECRET")
          },
          tls: {
            rejectUnauthorized: false
          }
        },
        defaults: {
          from: "\"No Reply\" <noreply.cookitup@gmail.com>"
        }
      }),
      inject: [ConfigService]
    }),
    NewsletterModule,
    SaleModule,
    WishlistModule,
    HtmlTemplateModule,
    NotificationsModule
  ],
  controllers: [AppController, CookieController],
  providers: [AppService, SaleEventsService]
})
export class AppModule {
}
