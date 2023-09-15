/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Likes } from "./entities/likes.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { JwtModule } from "@nestjs/jwt";
import { Article } from "./entities/article.entity";
import { Online } from "src/letter/entities/online.entity";
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Likes,Article,Online]),
    JwtModule.register({
      secret: 'hr',
      signOptions: {
        expiresIn: '7d'
      }
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
