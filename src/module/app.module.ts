import { Module } from '@nestjs/common'
import { AppController } from '../controller/app.controller'
import { VueController } from '../controller/vue.controller'
import { QiniuController } from '../controller/qiniu.controller'
import { UserController } from '../controller/user.controller'
import { VueService } from '../service/vue.service'
import { ResourceService } from '../service/resource.service'
import { QiniuService } from '../service/qiniu.service'
import { UserService } from '../service/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentEntity } from '../entity/comment.entity'
import { ResourceEntity } from '../entity/resource.entity'
import { TagEntity } from '../entity/tag.entity'
import { UserEntity } from '../entity/user.entity'
import { UserStarsEntity } from '../entity/userStars.entity'
import { VueEntity } from '../entity/vue.entity'
import { config } from '../config'
import { WechatService } from '../service/wechat.service'

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

  controllers: [AppController, VueController, QiniuController, UserController],
  providers: [
    VueService,
    ResourceService,
    QiniuService,
    UserService,
    WechatService,
  ],
})
export class AppModule {}
