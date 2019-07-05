import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { CommonEntity } from "./common.entity"

@Entity("vue")
export class VueEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({
    length: 500,
  })
  feeling: string

  // json.stringify(array)
  @Column({
    length: 500,
  })
  tag_ids: string

  // json.stringify(array)
  @Column({
    length: 500,
  })
  resource_ids: string

  @Column({
    length: 200,
    default: "",
  })
  music: string

  @Column()
  create_by: number

  // json.stringify(array)
  @Column({
    length: 500,
  })
  comments: string

  // stars by userStar table
}
