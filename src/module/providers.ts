import { VueService } from '../service/vue.service'
import { ResourceService } from '../service/resource.service'
import { QiniuService } from '../service/qiniu.service'
import { UserService } from '../service/user.service'
import { WechatService } from '../service/wechat.service'

export const providers = [
  VueService,
  ResourceService,
  QiniuService,
  UserService,
  WechatService,
]
