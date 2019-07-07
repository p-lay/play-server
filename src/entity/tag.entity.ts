import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common.entity'

@Entity('tag')
export class TagEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
