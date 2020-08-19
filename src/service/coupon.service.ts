import { Injectable, Inject } from '@nestjs/common'
import {
  EncryptCouponReq,
  EncryptCouponRes,
  DecryptCouponReq,
  DecryptCouponRes,
} from '../../contract/coupon'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CouponEntity } from '../entity/coupon.entity'
import * as NodeRSA from 'node-rsa'
import * as fs from 'fs'
import * as md5 from 'md5'

@Injectable()
export class CouponService {
  private publicRsa = null
  private privateRsa = null
  constructor(
    @InjectRepository(CouponEntity)
    readonly repo: Repository<CouponEntity>,
  ) {
    const publicKey = fs.readFileSync(`${__dirname}/../../rsa/id_rsa.pub`)
    const privateKey = fs.readFileSync(`${__dirname}/../../rsa/id_rsa`)
    this.publicRsa = new NodeRSA(publicKey)
    this.privateRsa = new NodeRSA(privateKey)
  }

  async encryptCoupon(param: EncryptCouponReq): Promise<EncryptCouponRes> {
    var encrypted = this.privateRsa.encryptPrivate(param.message, 'base64')
    const rasEncrypted = encrypted.toString()
    const md5Str = md5(encrypted.toString())

    const entity = new CouponEntity()
    entity.md5 = md5Str
    entity.rsa = rasEncrypted
    await this.repo.save(entity)

    return {
      md5: md5Str,
    }
  }

  async decryptCoupon(param: DecryptCouponReq): Promise<DecryptCouponRes> {
    const coupon = await this.repo.findOne({
      md5: param.md5,
    })
    if (coupon && coupon.rsa) {
      const buffer = this.publicRsa.decryptPublic(coupon.rsa)
      return {
        message: buffer.toString(),
      }
    } else {
      return {
        decryptFailed: true,
      }
    }
  }
}
