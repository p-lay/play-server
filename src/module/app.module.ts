import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { config } from '../config'
import { providers } from './providers'
import { entities } from './entities'
import { controllers } from './controllers'

@Module({
  imports: [
    TypeOrmModule.forRoot(config.orm as any),
    TypeOrmModule.forFeature(entities),
  ],
  controllers,
  providers,
})
export class AppModule {}
