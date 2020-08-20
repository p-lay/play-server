import { Controller, Get, Post, Body, Req, Res } from '@nestjs/common'import { CouponService } from '../service/coupon.service'import { CommonRes } from '../../contract/global'import {  EncryptCouponReq,  EncryptCouponRes,  DecryptCouponReq,  DecryptCouponRes,  UseCouponReq,  UseCouponRes,} from '../../contract/coupon'@Controller()export class CouponController {  constructor(private readonly service: CouponService) {}  @Post('encryptCoupon')  async encryptCoupon(    @Body() param: EncryptCouponReq,  ): CommonRes<EncryptCouponRes> {    const data = await this.service.encryptCoupon(param)    return {      data,    }  }  @Post('decryptCoupon')  async decryptCoupon(    @Body() param: DecryptCouponReq,  ): CommonRes<DecryptCouponRes> {    const data = await this.service.decryptCoupon(param)    return {      data,    }  }  @Post('useCoupon')  async useCoupon(@Body() param: UseCouponReq): CommonRes<UseCouponRes> {    const data = await this.service.useCoupon(param)    return {      data,    }  }}