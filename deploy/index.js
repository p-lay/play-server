const { execSync } = require('child_process')
const isProd = process.argv.includes('--prod')
const instanceName = isProd ? 'play-prod' : 'play-sit'

console.log('start build...')
execSync('yarn build')

let isNewIns = false
try {
  execSync(`pm2 desc ${instanceName}`)
} catch (err) {
  isNewIns = err.message.includes("doesn't exist")
}

console.log(`start deploy ${instanceName}...`)
try {
  if (isNewIns) {
    execSync(
      `pm2 start ./deploy/play.pm2.yaml ${isProd ? '--env production' : ''} --update-env`,
    )
  } else {
    execSync(`pm2 restart ${instanceName}`)
  }
} catch (err) {
  console.log(`!!!${isNewIns ? 'new' : 'restart'} error`, err)
}

console.log('finish...')
