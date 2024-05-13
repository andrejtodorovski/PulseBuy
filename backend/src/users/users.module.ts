import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/models/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { UserEventsService } from "./user-events.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService, UserEventsService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {
}
