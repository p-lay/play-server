import { Controller, Get, Post, Body } from "@nestjs/common"
import { VueService } from "../service/vue.service"
import { AddVueReq, UpdateVueReq } from "../type/vue"
import { CommonRes } from "../type/global"

@Controller()
export class VueController {
  constructor(private readonly appService: VueService) {}

  @Post()
  async addVue(@Body() param: AddVueReq): CommonRes {
    const data = this.appService.addVue(param)
    return {
      data,
    }
  }

  @Post()
  async updateVue(@Body() param: UpdateVueReq): CommonRes {
    const data = this.appService.updateVue(param)
    return {
      data,
    }
  }
}
