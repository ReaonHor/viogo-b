/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  Session,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { AuthGuard } from "src/auth/auth.guard";
import { JwtService } from "@nestjs/jwt";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  @Post("login")
  createUser(@Body() body, @Session() session) {
    return this.userService.createUser(body, session);
  }

  
  @Post("password")
  @UseGuards(AuthGuard)
  changePassword(@Body() body) {
    return this.userService.changePassword(body);
  }

  
  @Post("update")
  @UseGuards(AuthGuard)
  updateUser(@Body() body) {
    return this.userService.updateUser(body);
  }

  @Get("code")
  createCode(@Req() req, @Res() res) {
    return this.userService.createCode(req, res);
  }

  
  @Post("support")
  @UseGuards(AuthGuard)
  addSupport(@Body() body) {
    return this.userService.addSupport(body);
  }

  
  @Post("collect")
  @UseGuards(AuthGuard)
  addCollect(@Body() body) {
    return this.userService.addCollect(body);
  }

  @Post("likes")
  @UseGuards(AuthGuard)
  getLikes(@Body() body) {
    return this.userService.getLikes(body);
  }

  @Get("find")
  getUserList() {
    return this.userService.getUserList();
  }

  @Get("articles/:id")
  getArticles(@Param() param) {
    return this.userService.getArticles(param);
  }

  @Post("articles")
  addArticles(@Body() body) {
    return this.userService.addArticles(body);
  }

  @Delete("article/:id")
  deleteArticles(@Param('id') param) {
    return this.userService.deleteArticles(param);
  }

  @UseGuards(AuthGuard)
  @Get("likearticle/:id")
  likeArticle(@Param('id') param) {
    return this.userService.likeArticle(param);
  }

}
