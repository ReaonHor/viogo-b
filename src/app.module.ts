/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";
import { VioModule } from "./vio/vio.module";
// import { User } from "./user/entities/user.entity";
import { VideoModule } from "./video/video.module";
import { AuthGuard } from "./auth/auth.guard";
import { LetterModule } from './letter/letter.module';
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      username: "root",
      password: "123456",
      host: "127.0.0.1",
      port: 3306,
      database: "viogo",
      // entities: [__dirname + "/**/*.entity{.ts,.js}"],
      // entities: [User],
      synchronize: true,
      retryDelay: 500,
      retryAttempts: 10,
      autoLoadEntities: true,
    },
    ),
    JwtModule.register({
      secret: 'hr',
      signOptions: {
        expiresIn: '7d'
      }
    }),
    VioModule,
    UserModule,
    UploadModule,
    VideoModule,
    LetterModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGuard],
})
export class AppModule { }
