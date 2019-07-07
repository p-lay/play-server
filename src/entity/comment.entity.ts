import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { CommonEntity } from './common.entity'

@Entity('comment')
export class CommentEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @Column()
  reply_to: number

  @Column({
    length: 200,
  })
  content: string

  @Column()
  resource_id: number
}
