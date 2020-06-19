import { merge } from 'lodash'
import { resolve } from 'path'
import prodConfig from './prod'
let secret = require('../../secret.json')

const isSit = process.env.NODE_ENV === 'SIT'
const isProd = process.env.NODE_ENV === 'PROD'

let config = {
  port: 3000,
  hostName: '0.0.0.0',

  AppID: 'wx543e380c0605e7f9',
  AppSecret: secret.AppSecret,

  orm: {
    type: 'mysql',
    host: '47.101.55.100',
    port: 3310,
    username: 'root',
    password: '123456',
    database: 'play',
    entities: [resolve(`./**/*.entity${isSit ? '.js' : '.ts'}`)],
    timezone: 'UTC',
    charset: 'utf8mb4',
    multipleStatements: true,
    dropSchema: false,
    synchronize: true,
    logging: true,
  },

  qiniu: {
    ak: 'JveHPNkOjWM_S3a9LipKNz8vZdsJJkmTKzZNwenx',
    sk: secret.qiniu_sk,
    bucket: 'matthew5-qiniu',
  },
}

if (isProd) {
  config = merge(config, prodConfig)
}

export { config }
