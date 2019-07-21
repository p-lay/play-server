import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { VueEntity } from '../entity/vue.entity'
import { ResourceService } from './resource.service'
import {
  AddVueReq,
  UpdateVueReq,
  GetVueReq,
  GetVueRes,
  DeleteMemoriaReq,
} from '../../contract/vue'
import { Exception } from '../util/exception'
import { getTimeStampByDate } from '../util/entity'

@Injectable()
export class VueService {
  constructor(
    @InjectRepository(VueEntity)
    private readonly vueRepo: Repository<VueEntity>,
    @Inject(ResourceService)
    private readonly resourceService: ResourceService,
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
        create_time: getTimeStampByDate(entity.create_time),
        update_time: getTimeStampByDate(entity.update_time),
        title: entity.title,
        feeling: entity.feeling,
        music: entity.music,
        resources: resourceRes.resources,
        // TODO
        tags: JSON.parse(entity.tag_ids),
      }
    } else {
      throw new Exception(2000)
    }
  }

  async updateVue(param: UpdateVueReq) {
    const value = await this.vueRepo.findOne({
      id: param.id,
    })
    if (value) {
      const updateInfo = {
        title: param.title,
        feeling: param.feeling || '',
        music: param.music || '',
        resource_ids: '',
        tag_ids: '',
      }
      const resourceIds = JSON.parse(value.resource_ids)
      await this.resourceService.deleteResource({
        ids: resourceIds,
      })
      const resource_ids = await this.resourceService.addResource({
        resources: param.resources,
      })
      updateInfo.resource_ids = JSON.stringify(resource_ids)
      // TODO
      updateInfo.tag_ids = JSON.stringify(param.tags)
      this.vueRepo.update(
        {
          id: param.id,
        },
        updateInfo,
      )
    } else {
      throw new Exception(2000)
    }
  }

  async getMemoriaList(param: any) {
    const memorias = await this.vueRepo.find()
    return {
      memorias: memorias.map(x => ({ id: x.id, title: x.title })),
    }
  }

  async deleteMemoria(param: DeleteMemoriaReq) {
    await this.vueRepo.delete({
      id: param.id,
    })
  }
}
