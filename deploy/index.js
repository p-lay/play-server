const { execSync } = require('child_process')
const isProd = process.argv.includes('--prod')
const instanceName = isProd ? 'play-prod' : 'play-sit'

console.log(`start deploy ${instanceName}`)

console.log('fetching...')
execSync('git submodule update --remote')
execSync('git pull')

console.log('stopping...')
execSync(`pm2 stop ${instanceName}`)

console.log('building...')
execSync('yarn build')

console.log('copy...')
execSync('cp secret.json dist/')

let isNewIns = false
try {
  execSync(`pm2 desc ${instanceName}`)
} catch (err) {
  isNewIns = err.message.includes("doesn't exist")
}

console.log(`deploying...`)
try {
  if (isNewIns) {
    execSync(
      `pm2 start ./deploy/play.pm2.yaml ${isProd ? '--env production' : ''} --update-env`,
    )
  } else {
    execSync(`pm2 start ${instanceName}`)
  }
} catch (err) {
  console.log(`!!!${isNewIns ? 'new' : 'start'} error`, err)
}

console.log('finish')
