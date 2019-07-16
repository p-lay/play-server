import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common.entity'

@Entity('user')
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    default: 0,
  })
  role_id: number

  @Column({
    type: 'char',
    length: 20,
  })
  name: string

  @Column({
    length: 200,
  })
  avatar: string

  @Column({
    length: 50,
    unique: true,
  })
  openid: string

  @Column()
  gender: number

  @Column()
  province: string

  @Column()
  city: string

  @Column()
  country: string

  @Column()
  language: string
}
