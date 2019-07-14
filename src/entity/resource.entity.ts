import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common.entity'
import { longLength } from '../util/entity'

@Entity('resource')
export class ResourceEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: longLength,
    default: '',
  })
  description: string

  @Column({
    length: 200,
    default: '',
  })
  url: string

  @Column({
    default: 'image',
  })
  type: string
}
