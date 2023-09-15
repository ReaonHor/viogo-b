import { Injectable } from "@nestjs/common";
import { CreateVioDto } from "./dto/create-vio.dto";
import { UpdateVioDto } from "./dto/update-vio.dto";
import { Response, Request } from "express";
import axios from "axios";

@Injectable()
export class VioService {
  create(createVioDto: CreateVioDto) {
    return "This action adds a new vio";
  }
  async findVioComment(body, req) {
    const { oid, mode, next } = body;
    const cookies = req.headers.cookie;
    console.log(oid, mode, next);
    const data = await axios
      .get("https://api.bilibili.com/x/v2/reply/main", {
        params: {
          type: 1,
          oid,
          mode,
          next,
        },
        headers: {
          Cookie: cookies, //添加名为Cookie的请求头
        },
      })
      .then((res) => {
        return res.data;
      });
    return data;
  }

  async findcid(query) {
    const { aid } = query;
    const data = await axios
      .get("https://api.bilibili.com/x/player/pagelist", {
        params: {
          aid,
        },
      })
      .then((res) => {
        return res.data;
      });
    return data;
  }

  async findReferVio(query) {
    const { pn } = query;
    const data = await axios
      .get(`https://api.bilibili.com/x/web-interface/popular?pn=${pn}`)
      .then((res) => {
        return res.data;
      });
    return data;
  }

  async findCoverVio(query) {
    const { avid, cid } = query;
    const data = await axios
      .get("https://api.bilibili.com/x/player/playurl", {
        params: {
          avid,
          cid,
          platform: "html5",
        },
      })
      .then((res) => {
        return res.data;
      });
    return data;
  }
  async findhotword() {
    const data = await axios
      .get("https://s.search.bilibili.com/main/hotword")
      .then((res) => {
        return res.data;
      });
    return data;
  }
  async findVioDetail(body) {
    const { aid } = body;
    const data = await axios
      .get("https://api.bilibili.com/x/web-interface/view/detail", {
        params: {
          aid,
        },
      })
      .then((res) => {
        return res.data;
      });
    return data;
  }

  async findSuggest(body) {
    const { suggest } = body;
    const data = await axios
      .get("https://s.search.bilibili.com/main/suggest", {
        params: {
          term: suggest,
          highlight: suggest,
        },
      })
      .then((res) => {
        return res.data;
      });
    return data;
  }
  async findSearch(body, req: Request) {
    const { keyword, order, page } = body;
    const cookies = req.headers.cookie;
    const data = axios({
      method: "get",
      url: "https://api.bilibili.com/x/web-interface/search/type",
      params: {
        search_type: "video",
        keyword: keyword,
        order: order,
        page: page,
      },
      headers: {
        Cookie: cookies, //添加名为Cookie的请求头
      },
    }).then((res) => {
      return res.data;
    });
    return data;
  }
}
