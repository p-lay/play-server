export type CommonRes<T = any> = Promise<{
  // default 0
  code?: number
  message?: string
  data: T
}>
