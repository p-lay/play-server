import { Injectable, Inject } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { VueEntity } from "../entity/vue.entity"
import { ResourceService } from "./resource.service"
import { AddVueReq, UpdateVueReq } from "../type/vue"

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

    const resource_ids = this.resourceService.addResource(param.resources)
    vue.resource_ids = JSON.stringify(resource_ids)

    vue.tag_ids = JSON.stringify(param.tags)

    vue.title = param.title
    vue.create_by = param.user_id
    const value = await this.vueRepo.save(vue)

    return value
  }

  async updateVue(param: UpdateVueReq) {
    const value = await this.vueRepo.find()
    console.log("value", value)
    return value
  }
}
