const { execSync } = require("child_process")
const isProd = process.argv.includes("--prod")
const instanceName = isProd ? "play-prod" : "play-sit"

execSync("yarn build")

let isNewIns = false
try {
  execSync(`pm2 desc ${instanceName}`)
} catch (err) {
  isNewIns = err.message.includes("doesn't exist")
}

if (isNewIns) {
  execSync(`pm2 start ./deploy/play.pm2.yaml ${isProd ? "--env production" : ""}`)
} else {
  execSync(`pm2 restart ${instanceName}`)
}
