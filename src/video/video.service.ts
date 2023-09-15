import { Injectable } from "@nestjs/common";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import axios from "axios";

@Injectable()
export class VideoService {
  find(body) {
    const { aid, cid } = body;
    const data = axios
      .get("https://api.bilibili.com/x/player/playurl", {
        params: {
          avid: aid,
          cid,
          platform: "html5",
        },
      })
      .then((res) => {
        return res.data;
      });
    return data;
  }
  findDanmu(body) {
    const { cid } = body;
    const data = axios
      .get("https://api.bilibili.com/x/v1/dm/list.so", {
        params: {
          oid: cid,
        },
      })
      .then((res) => {
        return res.data;
      });
    return data;
  }
}
