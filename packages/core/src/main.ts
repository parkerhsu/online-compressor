import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { VersioningType } from '@nestjs/common'
import { TransformInterceptor } from '@/common/interceptors/transform.interceptor'
import { AllExceptionsFilter } from '@/common/exceptions/base.exception.filter'
import { HttpExceptionsFilter } from '@/common/exceptions/http.exception.filter'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  app.enableVersioning({
    type: VersioningType.URI
  })

  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionsFilter())

  await app.listen(3000)
}
bootstrap()
