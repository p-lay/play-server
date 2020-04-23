import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common.entity'

@Entity('express_task')
export class ExpressTaskEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  category: string

  @Column()
  serial_number: string

  @Column()
  status: number

  @Column()
  note: string
}
