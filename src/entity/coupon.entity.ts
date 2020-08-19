import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common.entity'
import { longLength } from '../util/entity'

@Entity('coupon')
export class CouponEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  md5: string

  @Column({
    length: longLength,
    default: '',
  })
  rsa: string
}
