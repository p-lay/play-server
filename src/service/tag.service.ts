import { Injectable, Inject } from '@nestjs/common'
import {
  AddTagReq,
  DeleteTagReq,
  SearchTagReq,
  SearchTagRes,
} from '../../contract/tag'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { TagEntity } from '../entity/tag.entity'
import { MemoriaTagEntity } from '../entity/memoriaTag.entity'
import { Exception } from '../util/exception'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    readonly repo: Repository<TagEntity>,
    @InjectRepository(MemoriaTagEntity)
    readonly memoriaTagRepo: Repository<MemoriaTagEntity>,
  ) {}

  async addTag(param: AddTagReq): Promise<any> {
    const entity = new TagEntity()
    entity.name = param.name
    await this.repo.save(entity)
  }

  async deleteTag(param: DeleteTagReq): Promise<any> {
    if (await this.isTagRelatedWithMemoria(param.id)) {
      throw new Exception(3000)
    } else {
      this.repo.delete({
        id: param.id,
      })
    }
  }

  async searchTag(param: SearchTagReq): Promise<SearchTagRes> {
    const tagRes: SearchTagRes = {
      tags: [],
    }
    if (param.withMemoria) {
      const selection = [
        'tag.id as id',
        'tag.name as name',
        'relation.memoria_id as memoria_id',
      ]
      const where = param.keyword ? `where relation.name like ?` : ''
      const queryStr = `select ${selection.join(
        ', ',
      )} from tag left join memoria_tag_relation relation on tag.id = relation.tag_id ${where}`
      const res = await this.repo.query(queryStr, [`%${param.keyword}%`])
      res.forEach(entity => {
        const tag = tagRes.tags.find(x => x.id == entity.id)
        if (tag) {
          entity.memoria_id && tag.memoriaIds.push(entity.memoria_id)
        } else {
          const memoriaIds = entity.memoria_id ? [entity.memoria_id] : []
          tagRes.tags.push({
            id: entity.id,
            name: entity.name,
            memoriaIds,
          })
        }
      })
    } else {
      const condition = param.keyword
        ? {
            name: Like(`%${param.keyword}%`),
          }
        : null

      const res = await this.repo.find(condition)
      tagRes.tags = res.map(x => ({ id: x.id, name: x.name }))
    }
    return tagRes
  }

  async isTagRelatedWithMemoria(tagId: number) {
    const entity = await this.memoriaTagRepo.findOne({
      tag_id: tagId,
    })
    return !!entity
  }
}
