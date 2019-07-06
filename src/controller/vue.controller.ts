import { Controller, Get, Post, Body } from "@nestjs/common"
import { VueService } from "../service/vue.service"
import { AddVueReq, UpdateVueReq, GetVueReq } from "../contract/vue"
import { CommonRes } from "../contract/global"

@Controller()
export class VueController {
  constructor(private readonly vueService: VueService) {}

  @Post("addVue")
  async addVue(@Body() param: AddVueReq): CommonRes {
    const data = await this.vueService.addVue(param)
    return {
      data,
    }
  }

  @Post("getVue")
  async getVue(@Body() param: GetVueReq): CommonRes {
    const data = await this.vueService.getVue(param)
    return {
      data,
    }
  }

  @Post("updateVue")
  async updateVue(@Body() param: UpdateVueReq): CommonRes {
    const data = this.vueService.updateVue(param)
    return {
      data,
    }
  }
}
