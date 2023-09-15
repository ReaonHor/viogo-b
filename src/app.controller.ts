import { Controller, Get, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { Response } from "express";
import axios from "axios";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  get() {
    return this.appService.getHello();
  }
  @Get("/cookie")
  async getCookie(@Res() res: Response) {
    const cookies = await axios.get("https://bilibili.com").then((res) => {
      return res.headers["set-cookie"];
    });
    const myCookies = cookies.map((item) =>
      item.replace(".bilibili.com", "localhost")
    );
    console.log(myCookies);
    res.setHeader("Set-Cookie", myCookies);
    res.send("请求cookie成功");
  }
}
