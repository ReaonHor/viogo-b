/* eslint-disable prettier/prettier */
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { LetterService } from "./letter.service";
import { CreateLetterDto } from "./dto/create-letter.dto";
import { UpdateLetterDto } from "./dto/update-letter.dto";
// import { Socket } from "@nestjs/platform-socket.io";
// import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class LetterGateway {
  constructor(private readonly letterService: LetterService) { }

  @SubscribeMessage("loginConnect")
  connect(@MessageBody() userId, @ConnectedSocket() socket) {
    return this.letterService.connect(userId, socket);
  }

  @SubscribeMessage("private_chat")
  privateChat(@MessageBody() body,@ConnectedSocket() socket) {
    return this.letterService.privateChat(body,socket);
  }

  @SubscribeMessage("online_list")
  getOnlineList(@MessageBody() userId) {
    return this.letterService.getOnlineList(userId);
  }

  @SubscribeMessage("get_chat")
  getChatList(@MessageBody() body) {
    return this.letterService.getChatList(body);
  }

  

}
