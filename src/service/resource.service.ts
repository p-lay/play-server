import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ResourceEntity } from "../entity/resource.entity"
import { Resource } from "../type/resource"

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly resourceRepo: Repository<ResourceEntity>,
  ) {}

  async addResource(param: Resource[]) {
    const resources = param.map(x => {
      const resource = new ResourceEntity()
      resource.url = x.url
      resource.description = x.description
      resource.type = x.type
      return resource
    })
    const value = await this.resourceRepo.save(resources)
    return value.map(x => x.id)
  }
}
