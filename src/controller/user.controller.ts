import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common'
import { UserService } from '../service/user.service'
import { CommonRes } from '../../contract/global'
import { GetUserInfoReq, GetUserInfoRes, UpdateUserInfoReq } from '../../contract/user'

@Controller()
export class UserController {  constructor(private readonly service: UserService) {}    @Post('getUserInfo')  async getUserInfo(@Body() param: GetUserInfoReq): CommonRes<GetUserInfoRes> {    const data = await this.service.getUserInfo(param)    return {      data,    }  }  @Post('updateUserInfo')  async updateUserInfo(@Body() param: UpdateUserInfoReq): CommonRes {    const data = await this.service.updateUserInfo(param)    return {      data,    }  }
}