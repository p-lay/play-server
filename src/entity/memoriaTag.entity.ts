import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common.entity'

@Entity('memoria_tag_relation')
export class MemoriaTagEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  memoria_id: number

  @Column()
  tag_id: number
}
