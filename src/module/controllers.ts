import { UserController } from '../controller/user.controller'import { MemoriaController } from '../controller/memoria.controller'import { QiniuController } from '../controller/qiniu.controller'import { TagController } from '../controller/tag.controller'import { ExpressTaskController } from '../controller/expressTask.controller'import { CouponController } from '../controller/coupon.controller'export const controllers = [  UserController,  MemoriaController,  QiniuController,  TagController,  ExpressTaskController,  CouponController,]