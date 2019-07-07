import { merge } from "lodash"
import { resolve } from "path"
import prodConfig from "./prod"

const isSit = process.env.NODE_ENV === "SIT"
const isProd = process.env.NODE_ENV === "PROD"

let config = {
  port: 3000,
  hostName: "localhost",

  AppID: "wxe504e52c0d7a966d",
  AppSecret: "ef2c33c9807d24a3ea4f379dbdd0dfd6",

  orm: {
    type: "mysql",
    host: "106.15.233.166",
    port: 3310,
    username: "root",
    password: "123456",
    database: "play",
    entities: [resolve(`./**/*.entity${isSit || isProd ? ".js" : ".ts"}`)],
    timezone: "UTC",
    charset: "utf8mb4",
    multipleStatements: true,
    dropSchema: false,
    synchronize: true,
    logging: true,
  },
}

if (isProd) {
  config = merge(config, prodConfig)
}

export { config }
