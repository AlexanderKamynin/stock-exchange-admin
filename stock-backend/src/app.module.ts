import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokersController } from './brokers/brokers.controller';
import { BrokersService } from './brokers/brokers.service';

@Module({
  imports: [],
  controllers: [AppController, BrokersController],
  providers: [AppService, BrokersService],
})
export class AppModule {}
