import { Module } from "@nestjs/common"
import { VueController } from "../controller/vue.controller"
import { VueService } from "../service/vue.service"
import { ResourceService } from "../service/resource.service"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CommentEntity } from "../entity/comment.entity"
import { ResourceEntity } from "../entity/resource.entity"
import { TagEntity } from "../entity/tag.entity"
import { UserEntity } from "../entity/user.entity"
import { UserStarsEntity } from "../entity/userStars.entity"
import { VueEntity } from "../entity/vue.entity"
import { config } from "../config"

const entities = [
  CommentEntity,
  ResourceEntity,
  TagEntity,
  UserEntity,
  UserStarsEntity,
  VueEntity,
]
@Module({
  imports: [
    TypeOrmModule.forRoot(config.orm as any),
    TypeOrmModule.forFeature(entities),
  ],

  controllers: [VueController],
  providers: [VueService, ResourceService],
})
export class AppModule {}
