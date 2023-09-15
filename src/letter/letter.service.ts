/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateLetterDto } from "./dto/create-letter.dto";
import { UpdateLetterDto } from "./dto/update-letter.dto";
import { Online } from "./entities/online.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { Chat } from "./entities/chat.entity";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class LetterService {
  constructor(
    @InjectRepository(Online) private readonly online: Repository<Online>,
    @InjectRepository(Chat) private readonly chat: Repository<Chat>,
    @InjectRepository(User) private readonly user: Repository<User>
  ) { }
  async connect(userId, socket) {
    const { id } = socket
    const user = await this.online.findOne({ where: { userId } }).then(res => res)
    if (user) {
      this.online.update({ userId }, { socketid: id, isOnline: true })
    } else {
      this.online.save({ userId, isOnline: true })
    }
    socket.on('disconnect', () => {
      this.online.update({ userId }, { isOnline: false })
    })

    return '处于登录在线状态';
  }
  async privateChat(body, socket) {
    const { message, sender, recever } = body
    console.log(message, sender, recever)
    const { id } = await this.user.findOne({ where: { username: recever }, select: { id: true } })
    const { socketid } = await this.online.findOne({ where: { userId: id }, select: { socketid: true } })
    const result = await this.chat.save({ message, sender: sender, recever: recever }).then(res => res)
    await socket.to(socketid).emit('reply_private_chat', { ...result });
    return {
      message: '发送成功',
      result
    }
  }
  async getOnlineList(userId) {
    const onlineList = await this.online.find({ where: { userId: Not(userId) }, relations: ['user'] }).then(res => res)
    const { username } = await this.user.findOne({ where: { id: userId }, select: { username: true } }).then(res => {
      return res
    }
    )
    const result = onlineList.map(async (item) => {
      const newMessage = await this.chat.findOne({
        where: [{
          sender: username,
          recever: item.user.username
        }, {
          sender: item.user.username,
          recever: username
        }],
        order: {
          createTime: 'DESC'
        }
      })
      return { ...item, ...newMessage }
    }
    )
    const returnList = await Promise.all(result).then(res => res)
    return returnList
  }



  async getChatList(body) {
    const { sender, recever } = body
    console.log(sender, recever)
    const result = await this.chat.find({ where: [{ sender, recever }, { sender: recever, recever: sender }] }).then(res => res)
    return result
  }
}
