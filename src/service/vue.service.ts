import { Injectable, Inject } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { VueEntity } from "../entity/vue.entity"
import { ResourceService } from "./resource.service"
import { AddVueReq, UpdateVueReq, GetVueReq, GetVueRes } from "../contract/vue"
import { Exception } from "../contract/exception"

@Injectable()
export class VueService {
  constructor(
    @InjectRepository(VueEntity)
    private readonly vueRepo: Repository<VueEntity>,
    @Inject(ResourceService) private readonly resourceService: ResourceService,
  ) {}

  async addVue(param: AddVueReq) {
    const vue = new VueEntity()
    vue.feeling = param.feeling
    vue.music = param.music

    const resources = param.resources
    const resource_ids = await this.resourceService.addResource({ resources })
    vue.resource_ids = JSON.stringify(resource_ids)

    // TODO
    vue.tag_ids = JSON.stringify(param.tags)

    vue.title = param.title
    vue.create_by = param.user_id

    const value = await this.vueRepo.save(vue)

    return value
  }

  async getVue(param: GetVueReq): Promise<GetVueRes> {
    const result = await this.vueRepo.find({
      id: param.vue_id,
    })
    if (result.length) {
      const entity = result[0]
      const resource_ids = JSON.parse(entity.resource_ids)
      const resourceRes = await this.resourceService.getResource({
        resource_ids,
      })
      const tagIds = JSON.parse(entity.tag_ids)
      return {
        vue_id: entity.id,
        comments: JSON.parse(entity.comments),
        // TODO: get user info, not id
        create_by: entity.create_by,
        create_time: entity.create_time,
        update_time: entity.update_time,
        title: entity.title,
        feeling: entity.feeling,
        music: entity.music,
        resources: resourceRes.resources,
        // TODO
        tags: JSON.parse(entity.tag_ids),
      }
    } else {
      throw new Exception(1000)
    }
  }

  async updateVue(param: UpdateVueReq) {
    const value = await this.vueRepo.find()
    return value
  }
}
