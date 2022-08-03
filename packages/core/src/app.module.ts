import { Module, CacheModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { getConfig } from '@/utils'
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: true, isGlobal: true, load: [getConfig] }),
    CacheModule.register({ isGlobal: true }),
    UserModule,
    FileModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
