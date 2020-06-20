import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common'import { MemoriaService } from '../service/memoria.service'import { CommonRes } from '../../contract/global'import {  AddMemoriaReq,  GetMemoriaReq,  GetMemoriaRes,  UpdateMemoriaReq,  SearchMemoriaReq,  SearchMemoriaRes,  DeleteMemoriaReq,} from '../../contract/memoria'@Controller()export class MemoriaController {  constructor(private readonly service: MemoriaService) {}  @Post('addMemoria')  async addMemoria(@Body() param: AddMemoriaReq): CommonRes {    const data = await this.service.addMemoria(param)    return {      data,    }  }  @Post('getMemoria')  async getMemoria(@Body() param: GetMemoriaReq): CommonRes<GetMemoriaRes> {    const data = await this.service.getMemoria(param)    return {      data,    }  }  @Post('updateMemoria')  async updateMemoria(@Body() param: UpdateMemoriaReq): CommonRes {    const data = await this.service.updateMemoria(param)    return {      data,    }  }  @Post('searchMemoria')  async searchMemoria(    @Body() param: SearchMemoriaReq,  ): CommonRes<SearchMemoriaRes> {    const data = await this.service.searchMemoria(param)    return {      data,    }  }  @Post('deleteMemoria')  async deleteMemoria(@Body() param: DeleteMemoriaReq): CommonRes {    const data = await this.service.deleteMemoria(param)    return {      data,    }  }}