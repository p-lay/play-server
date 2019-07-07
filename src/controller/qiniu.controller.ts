import { Controller, Get, Post, Body } from '@nestjs/common'
import { QiniuService } from '../service/qiniu.service'
import { AddVueReq, UpdateVueReq, GetVueReq } from '../contract/vue'
import { CommonRes } from '../contract/global'
import { GetQiniuTokenRes } from '../contract/qiniu'

@Controller()
export class QiniuController {
  constructor(private readonly service: QiniuService) {}

  @Post('getQiniuToken')
  async getQiniuToken(@Body() param: any): CommonRes<GetQiniuTokenRes> {
    const data = await this.service.getQiniuToken()
    return {
      data,
    }
  }
}
