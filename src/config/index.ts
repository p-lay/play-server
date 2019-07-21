import { merge } from 'lodash'
import { resolve } from 'path'
import prodConfig from './prod'

const isSit = process.env.NODE_ENV === 'SIT'
const isProd = process.env.NODE_ENV === 'PROD'

let config = {
  port: 3000,
  hostName: '0.0.0.0',

  AppID: 'wx543e380c0605e7f9',
  AppSecret: '49031a6db6cac75896daf6ddb5d7641f', // !!!!!!!!!!!

  orm: {
    type: 'mysql',
    host: '106.15.233.166',
    port: 3310,
    username: 'root',
    password: '123456',
    database: 'play',
    entities: [resolve(`./**/*.entity${isSit || isProd ? '.js' : '.ts'}`)],
    timezone: 'UTC',
    charset: 'utf8mb4',
    multipleStatements: true,
    dropSchema: false,
    synchronize: true,
    logging: true,
  },

  qiniu: {
    ak: 'JveHPNkOjWM_S3a9LipKNz8vZdsJJkmTKzZNwenx',
    sk: '_7_LKMIxOro5fbpx0LOcGCXq-lX6hsCHduZiw0fX', // !!!!!
    bucket: 'matthew5-qiniu',
  },
}

if (isProd) {
  config = merge(config, prodConfig)
}

export { config }
