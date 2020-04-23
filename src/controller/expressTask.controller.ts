import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common'import { ExpressTaskService } from '../service/expressTask.service'import { CommonRes } from '../../contract/global'import {  AddExpressTaskReq,  RemoveExpressTaskReq,  UpdateExpressTaskReq,  GetExpressTaskRes,} from '../../contract/expressTask'@Controller()export class ExpressTaskController {  constructor(private readonly service: ExpressTaskService) {}  @Post('addExpressTask')  async addExpressTask(@Body() param: AddExpressTaskReq): CommonRes {    const data = await this.service.addExpressTask(param)    return {      data,    }  }  @Post('removeExpressTask')  async removeExpressTask(@Body() param: RemoveExpressTaskReq): CommonRes {    const data = await this.service.removeExpressTask(param)    return {      data,    }  }  @Post('updateExpressTask')  async updateExpressTask(@Body() param: UpdateExpressTaskReq): CommonRes {    const data = await this.service.updateExpressTask(param)    return {      data,    }  }  @Post('getExpressTask')  async getExpressTask(@Body() param: any): CommonRes<GetExpressTaskRes> {    const data = await this.service.getExpressTask(param)    return {      data,    }  }}