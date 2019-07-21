import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ResourceEntity } from '../entity/resource.entity'
import {
  AddResourceReq,
  GetResourceReq,
  GetResourceRes,
  DeleteResourceReq,
} from '../../contract/resource'
import { In } from 'typeorm'

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepo: Repository<ResourceEntity>,
  ) {}

  async addResource(param: AddResourceReq) {
    const result = param.resources.map(x => {
      const resource = new ResourceEntity()
      resource.url = x.url
      resource.description = x.description
      resource.type = x.type
      return resource
    })
    const value = await this.resourceRepo.save(result)
    return value.map(x => x.id)
  }

  async getResource(param: GetResourceReq): Promise<GetResourceRes> {
    if (!param.resource_ids.length) {
      return {
        resources: [],
      }
    }

    const entities = await this.resourceRepo.find({
      id: In(param.resource_ids),
    })
    return {
      resources: entities.map(x => ({
        id: x.id,
        url: x.url,
        type: x.type as any,
        description: x.description,
      })),
    }
  }

  async deleteResource(param: DeleteResourceReq) {
    if (param.ids.length) {
      await this.resourceRepo.delete({
        id: In(param.ids),
      })
    }
  }
}
