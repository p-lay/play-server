import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common'
import { VueService } from '../service/vue.service'
import { CommonRes } from '../../contract/global'
import { AddVueReq, GetVueReq, GetVueRes, UpdateVueReq, GetMemoriaListRes, DeleteMemoriaReq } from '../../contract/vue'

@Controller()
export class VueController {  constructor(private readonly service: VueService) {}    @Post('addVue')  async addVue(@Body() param: AddVueReq): CommonRes {    const data = await this.service.addVue(param)    return {      data,    }  }  @Post('getVue')  async getVue(@Body() param: GetVueReq): CommonRes<GetVueRes> {    const data = await this.service.getVue(param)    return {      data,    }  }  @Post('updateVue')  async updateVue(@Body() param: UpdateVueReq): CommonRes {    const data = await this.service.updateVue(param)    return {      data,    }  }  @Post('getMemoriaList')  async getMemoriaList(@Body() param: any): CommonRes<GetMemoriaListRes> {    const data = await this.service.getMemoriaList(param)    return {      data,    }  }  @Post('deleteMemoria')  async deleteMemoria(@Body() param: DeleteMemoriaReq): CommonRes {    const data = await this.service.deleteMemoria(param)    return {      data,    }  }
}