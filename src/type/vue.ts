import { Resource } from "./resource"
import { Tag } from "./tag"

export interface AddVueReq {
  user_id: number
  title: string
  feeling?: string
  resources: Resource[]
  tags: Tag[]
  music?: string
}

export interface UpdateVueReq {
  vue_id: number
  title: string
  feeling?: string
  tags: string[]
  music?: string
}
