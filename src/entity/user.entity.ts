import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { CommonEntity } from "./common.entity"

@Entity("user")
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  role_id: number

  @Column({
    type: "char",
    length: 20,
    default: "",
  })
  name: string

  @Column({
    length: 200,
    default: "",
  })
  avatar: string

  @Column({
    length: 50,
    unique: true,
  })
  openid: string

  @Column({
    default: null,
  })
  gender: number
}
