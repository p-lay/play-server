import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common'
import { QiniuService } from '../service/qiniu.service'
import { CommonRes } from '../../contract/global'
import { GetQiniuTokenRes } from '../../contract/qiniu'

@Controller()
export class QiniuController {  constructor(private readonly service: QiniuService) {}    @Post('getQiniuToken')  async getQiniuToken(@Body() param: any): CommonRes<GetQiniuTokenRes> {    const data = await this.service.getQiniuToken(param)    return {      data,    }  }
}