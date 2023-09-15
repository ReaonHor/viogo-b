/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { LetterService } from "./letter.service";
import { LetterGateway } from "./letter.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Online } from "./entities/online.entity";
import { Chat } from "./entities/chat.entity";
import { User } from "src/user/entities/user.entity";

@Module({
  imports:[
    TypeOrmModule.forFeature([Online,Chat,User]),
  ],
  providers: [LetterGateway, LetterService],
})
export class LetterModule { }
