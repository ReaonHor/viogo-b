import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { VideoService } from "./video.service";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";

@Controller("video")
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  find(@Body() body) {
    return this.videoService.find(body);
  }
  @Post("danmu")
  findDanmu(@Body() body) {
    return this.videoService.findDanmu(body);
  }
}
