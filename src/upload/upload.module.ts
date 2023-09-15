/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common"
import { MulterModule } from "@nestjs/platform-express/multer"
import { diskStorage } from "multer"
import { extname, join } from "path"
import { UploadController } from "./upload.controller"
import { UploadService } from "./upload.service"
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { Article } from "src/user/entities/article.entity"
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, "../images"),
        filename: (_, file, callback) => {
          const filename = `${new Date().getTime() + extname(file.originalname)
            }`
          return callback(null, filename)
        }
      })
    }),
    TypeOrmModule.forFeature([User,Article]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule { }
