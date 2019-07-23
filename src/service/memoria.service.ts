import { Injectable, Inject } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MemoriaEntity } from '../entity/memoria.entity'
import { ResourceService } from './resource.service'
import {
  AddMemoriaReq,
  GetMemoriaReq,
  GetMemoriaRes,
  UpdateMemoriaReq,
  GetMemoriaListReq,
  GetMemoriaListRes,
  DeleteMemoriaReq,
} from '../../contract/memoria'
import { Exception } from '../util/exception'
import { convertEntityDateToUnix, convertToEntityDate } from '../util/entity'

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
    memoria.thumb = param.thumb

    // TODO
    memoria.tag_ids = JSON.stringify(param.tags)

    memoria.title = param.title
    memoria.create_by = param.user_id
    memoria.create_time = convertToEntityDate(param.create_time)

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
        create_time: convertEntityDateToUnix(entity.create_time),
        update_time: convertEntityDateToUnix(entity.update_time),
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
      const entity: Partial<MemoriaEntity> = {
        title: param.title,
        feeling: param.feeling || '',
        music: param.music || '',
        resource_ids: '',
        thumb: param.thumb,
        tag_ids: '',
        create_time: convertToEntityDate(param.create_time),
      }
      const resourceIds: number[] = JSON.parse(value.resource_ids)
      const paramExistResourceIds = param.existResourceIds || []
      const existResourceIds = resourceIds.filter(x =>
        paramExistResourceIds.includes(x),
      )
      const toRemoveResourceIds = resourceIds.filter(
        x => !paramExistResourceIds.includes(x),
      )
      await this.resourceService.deleteResource({
        ids: toRemoveResourceIds,
      })
      const resource_ids = await this.resourceService.addResource({
        resources: param.resources,
      })
      entity.resource_ids = JSON.stringify(
        existResourceIds.concat(resource_ids),
      )
      // TODO
      entity.tag_ids = JSON.stringify(param.tags)
      this.repo.update(
        {
          id: param.id,
        },
        entity,
      )
    } else {
      throw new Exception(2000)
    }
  }

  async getMemoriaList(param: GetMemoriaListReq): Promise<GetMemoriaListRes> {
    const where = param.create_by
      ? {
          create_by: param.create_by,
        }
      : null
    const memorias: MemoriaEntity[] = await this.repo.query(
      `select memoria.id as id, memoria.title as title, memoria.thumb as thumb, memoria.feeling as feeling, user.name as nick_name from memoria left join user on user.id = memoria.create_by order by memoria.create_time desc`,
    )
    return {
      memorias: memorias.map(x => ({
        id: x.id,
        title: x.title,
        thumb: x.thumb,
        feeling: x.feeling,
        creator: x['nick_name'],
      })),
    }
  }

  async deleteMemoria(param: DeleteMemoriaReq) {
    const memoria = await this.repo.findOne({
      id: param.id,
    })
    const resource_ids = JSON.parse(memoria.resource_ids)
    await this.resourceService.deleteResource({ ids: resource_ids })
    await this.repo.remove(memoria)
  }
}
