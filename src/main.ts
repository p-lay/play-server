import { NestFactory } from '@nestjs/core'
import { AppModule } from './module/app.module'
import { config } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(config.port, config.hostName, () => {
    console.log(
      `justPlay server has been started on http://${config.hostName}:${config.port}`,
    )
  })
}
bootstrap()
