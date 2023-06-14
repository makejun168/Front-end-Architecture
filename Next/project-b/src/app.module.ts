import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AaaModule } from './aaa/aaa.module';
import { XxxModule } from './xxx/xxx.module';

@Module({
  imports: [AaaModule, XxxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
