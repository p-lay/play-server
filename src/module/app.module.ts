import { Module } from "@nestjs/common"
import { AppController } from "../controller/app.controller"
import { AppService } from "../service/app.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CommentEntity } from "../entity/comment.entity"
import { ResourceEntity } from "../entity/resource.entity"
import { TagEntity } from "../entity/tag.entity"
import { UserEntity } from "../entity/user.entity"
import { UserStarsEntity } from "../entity/userStars.entity"
import { VueEntity } from "../entity/vue.entity"

const entities = [
  CommentEntity,
  ResourceEntity,
  TagEntity,
  UserEntity,
  UserStarsEntity,
  VueEntity,
]
@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature(entities)],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
