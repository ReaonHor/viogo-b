/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as svgCaptcha from "svg-captcha";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Likes } from "./entities/likes.entity";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import { getLikeList } from '../util/getLikeList'
import { Article } from "./entities/article.entity";
import { Online } from "src/letter/entities/online.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Likes) private readonly likes: Repository<Likes>,
    @InjectRepository(Article) private readonly articles: Repository<Article>,
    @InjectRepository(Online) private readonly online: Repository<Online>,
    private jwtService: JwtService,
  ) { }
  async createUser(body, session) {
    const { password, username, code } = body;
    if (password === "" || username === "" || code === "") {
      return {
        code: 300,
        message: "不能为空",
      };
    }
    if (session.code.toLocaleLowerCase() !== code.toLocaleLowerCase()) {
      return {
        code: 300,
        message: "验证码错误",
      };
    }
    const result = await this.user
      .find({
        where: {
          username,
        },
      })
      .then((res) => {
        return res;
      });
    if (result.length > 0) {
      //是注册过得账号，验证密码是否正确
      const mima = await this.user
        .find({
          where: {
            username,
            password,
          },
        })
        .then((res) => {
          return res;
        });
      if (mima.length > 0) {
        //密码正确
        const { username, avatar, nickname, signature, id } = mima[0]
        const payload = { username, id };
        const token = await this.jwtService.signAsync(payload);
        return {
          id,
          code: 200,
          message: '欢迎回来' + username,
          token,
          username,
          avatar,
          nickname,
          signature
        }
      } else {
        return {
          code: 300,
          message: "账号或者密码错误",
        };
      }
    } else {
      //没注册的处理
      const data = new User();
      data.username = username;
      data.password = password;
      const payload = { username };
      const { id } = await this.user.save(data).then(res => res)
      await this.online.save({ userId: id, isOnline: true, })
      // await this.online.create({userId:id,})
      const token = await this.jwtService.signAsync(payload);
      return {
        code: 200,
        message: '注册成功' + username,
        token,
        username: username,
        id
      };
    }
  }

  createCode(req, res) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: "#cc9966", //背景颜色
    });
    req.session.code = captcha.text; //存储验证码记录到session
    res.type("image/svg+xml");
    res.send(captcha.data);
  }

  async updateUser(body) {
    const { username, nickname, signature } = body
    const result = await this.user.update({ username }, { nickname, signature }).then(res => {
      return res
    })
    if (result.affected === 1) {
      return {
        data: '修改成功'
      }
    }
  }

  async addSupport(body) {
    const { username, aid } = body
    const data = await this.likes.findOne({ where: { username } }).then(res => res)
    if (data) {
      const support = data.support || []
      const flag = support.indexOf(aid)
      if (flag !== -1) {
        return {
          code: 200
        }
      } else {
        support.push(aid)
        await this.likes.update({ username }, { support })
        return {
          code: 200
        }
      }
    } else {
      const support = []
      support.push(aid)
      await this.likes.save({
        username,
        support
      })
      return {
        code: 200
      }
    }
  }
  async addCollect(body) {
    const { username, aid } = body
    const data = await this.likes.findOne({ where: { username } }).then(res => res)
    if (data) {
      const collect = data.collect || []
      const flag = collect.indexOf(aid)
      if (flag !== -1) {
        return {
          code: 200
        }
      } else {
        collect.push(aid)
        await this.likes.update({ username }, { collect })
        return {
          code: 200
        }
      }
    } else {
      const collect = []
      collect.push(aid)
      await this.likes.save({
        username,
        collect
      })
      return {
        code: 200
      }
    }
  }
  async getLikes(body) {
    const { username, type } = body
    const data = await this.likes.findOne({
      where: {
        username
      }
    }).then(res => res)
    if (data == null) {
      return {
        code: 200,
        data: []
      }
    } else {
      const list = type == 0 ? data.support : data.collect
      const results = await getLikeList(list)
      return {
        code: 200,
        data: results
      }
    }

  }
  async getUserList() {
    const userList = await this.user.find().then(res => res)
    return {
      code: 200,
      data: userList
    }
  }
  async getArticles(param) {
    let articles
    const { id } = param
    if (id == -1) {
      articles = await this.articles.find({ relations: ['user'], order: { createTime: 'DESC' } }).then(res => res)
    } else {
      articles = await this.articles.find({ where: { userId: id }, relations: ['user'], order: { createTime: 'DESC' } }).then(res => res)
    }
    return articles
  }
  async addArticles(body) {
    const { username, content, image, id } = body
    await this.articles.save({ username, content, image, userId: id })
    return {
      code: 200,
      message: '动态发布成功'
    }
  }
  async deleteArticles(param) {
    await this.articles.delete({ id: param })
    return {
      code: 200,
      message: '动态删除成功'
    }
  }
  async likeArticle(param) {
    await this.articles.update({ id: param }, { likes: () => "likes + 1" })
    return {
      code: 200,
      message: '点赞成功'
    }
  }
  async changePassword(body) {
    const { oldPassword, newPassword, id } = body
    const result = await this.user.findOne({ where: { id, password: oldPassword } }).then(res => res)
    if (result) {
      await this.user.update({ id }, { password: newPassword })
      return {
        code: 200,
        message: '修改密码成功'
      }
    } else {
      return {
        code: 300,
        message: '旧密码输入不正确'
      }
    }

  }

}
