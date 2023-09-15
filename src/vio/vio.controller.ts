import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Res,
  Req,
} from "@nestjs/common";
import { VioService } from "./vio.service";
import { CreateVioDto } from "./dto/create-vio.dto";
import { UpdateVioDto } from "./dto/update-vio.dto";
import { Response, Request } from "express";

@Controller("vio")
export class VioController {
  constructor(private readonly vioService: VioService) { }

  @Post()
  create(@Body() createVioDto: CreateVioDto) {
    return this.vioService.create(createVioDto);
  }

  @Get()
  findReferVio(@Query() query) {
    return this.vioService.findReferVio(query);
  }
  @Get("cover")
  findCoverVio(@Query() query) {
    return this.vioService.findCoverVio(query);
  }
  @Get("hotword")
  findhotword() {
    return this.vioService.findhotword();
  }
  @Get("cid")
  findcid(@Query() query) {
    return this.vioService.findcid(query);
  }
  @Post("detail")
  findVioDetail(@Body() body) {
    return this.vioService.findVioDetail(body);
  }
  @Post("comment")
  findVioComment(@Body() body, @Req() req: Request) {
    return this.vioService.findVioComment(body, req);
  }

  @Post("suggest")
  findSuggest(@Body() body) {
    return this.vioService.findSuggest(body);
  }
  @Post("search")
  findSearch(@Body() body, @Req() req: Request) {
    return this.vioService.findSearch(body, req);
  }
}
