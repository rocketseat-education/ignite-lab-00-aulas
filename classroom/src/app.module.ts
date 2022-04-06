import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [DatabaseModule, HttpModule, MessagingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
