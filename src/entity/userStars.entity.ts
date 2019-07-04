import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("user_stars")
export class UserStarsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @Column()
  resource_id: number
}
