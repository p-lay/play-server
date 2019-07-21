import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MemoriaEntity } from '../entity/memoria.entity'
import { ResourceService } from './resource.service'
import { AddMemoriaReq, GetMemoriaReq, GetMemoriaRes, UpdateMemoriaReq, GetMemoriaListRes, DeleteMemoriaReq } from '../../contract/memoria'
import { Exception } from '../util/exception'
import { getTimeStampByDate } from '../util/entity'

@Injectable()
export class MemoriaService {
  constructor(
    @InjectRepository(MemoriaEntity)
    private readonly repo: Repository<MemoriaEntity>,
    @Inject(ResourceService)
    private readonly resourceService: ResourceService,
  ) {}

  async addMemoria(param: AddMemoriaReq) {
    const memoria = new MemoriaEntity()
    memoria.feeling = param.feeling
    memoria.music = param.music

    const resources = param.resources
    const resource_ids = await this.resourceService.addResource({ resources })
    memoria.resource_ids = JSON.stringify(resource_ids)

    // TODO
    memoria.tag_ids = JSON.stringify(param.tags)

    memoria.title = param.title
    memoria.create_by = param.user_id

    const value = await this.repo.save(memoria)

    return value
  }

  async getMemoria(param: GetMemoriaReq): Promise<GetMemoriaRes> {
    const result = await this.repo.find({
      id: param.id,
    })
    if (result.length) {
      const entity = result[0]
      const resource_ids = JSON.parse(entity.resource_ids)
      const resourceRes = await this.resourceService.getResource({
        resource_ids,
      })
      const tagIds = JSON.parse(entity.tag_ids)
      return {
        id: entity.id,
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

  async updateMemoria(param: UpdateMemoriaReq) {
    const value = await this.repo.findOne({
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
      this.repo.update(
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
    const memorias = await this.repo.find()
    return {
      memorias: memorias.map(x => ({ id: x.id, title: x.title })),
    }
  }

  async deleteMemoria(param: DeleteMemoriaReq) {
    await this.repo.delete({
      id: param.id,
    })
  }
}
