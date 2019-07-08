import { Controller, Get, Post, Body } from '@nestjs/common'
import { CommonRes } from '../contract/global'

@Controller()
export class AppController {
  constructor() {}

  @Get()
  async getDefault(): CommonRes {
    return {
      data: 'running...',
    }
  }
}
