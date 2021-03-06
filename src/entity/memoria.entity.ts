import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common.entity'
import { columnOption, longLength } from '../util/entity'

@Entity('memoria')
export class MemoriaEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({
    length: 200,
    default: '',
  })
  thumb: string

  @Column({
    length: longLength,
    default: '',
  })
  feeling: string

  // json.stringify(array)
  @Column(columnOption.json)
  resource_ids: string

  @Column({
    length: 200,
    default: '',
  })
  music: string

  @Column()
  create_by: number

  // json.stringify(array)
  @Column({
    length: 500,
    nullable: true,
  })
  comments: string

  @Column({
    default: false,
  })
  is_large_data: boolean

  // stars by userStar table
}
