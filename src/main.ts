/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import * as cors from "cors";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express/interfaces";
import { join } from "path";
import { ValidationPipe } from '@nestjs/common'
import * as session from 'express-session'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cors());
  app.use(session({
    secret: "hrhrhr",
    rolling: true,
    name: 'hr.sid',
    cookie: { maxAge: 9999999 }
  }))
  app.useStaticAssets(join(__dirname, 'images'), {
    prefix: "/images"
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3001);
}
bootstrap();
