import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { CommonEntity } from "./common.entity"

@Entity("resource")
export class ResourceEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: "char",
    length: 20,
    default: "",
  })
  description: string

  @Column({
    length: 200,
    default: "",
  })
  url: string

  @Column()
  type: string
}
