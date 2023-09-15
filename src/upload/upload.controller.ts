/* eslint-disable prettier/prettier */
import { Controller, Post, UseInterceptors, UploadedFile, Query, Get, Param } from "@nestjs/common"
import { UploadService } from "./upload.service"
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express"
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Article } from "src/user/entities/article.entity";
import { Repository } from "typeorm";
import * as fs from 'fs-extra';
@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService, @InjectRepository(User) private readonly user: Repository<User>,) { }

  @Get('delete/:image')
  async deleteImage(@Param('image') imageName: string) {
    console.log(imageName)
    const imagePath = `dist/images/${imageName}`;
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      return {
        code: 200,
        message: `图片 ${imageName} 删除成功`
      }
    } else {
      return {
        code: 300,
        message: `图片 ${imageName} 不存在`
      }
    }
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  async upload(@UploadedFile() file, @Query() query) {
    const username = query.username
    await this.user.update({ username: username }, { avatar: file.filename })
    return {
      code: 200,
      data: file.filename
    };
  }
  @Post('article')
  @UseInterceptors(FileInterceptor('article'))
  async articleupload(@UploadedFile() file, @Query() query) {
    return {
      code: 200,
      data: file.filename
    };
  }
}
