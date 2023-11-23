import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokersController } from './brokers/brokers.controller';
import { BrokersService } from './brokers/brokers.service';
import { StocksController } from './stocks/stocks.controller';
import { StocksService } from './stocks/stocks.service';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [],
  controllers: [AppController, BrokersController, StocksController, SettingsController],
  providers: [AppService, BrokersService, StocksService, SettingsService, WebsocketGateway],
})
export class AppModule {}
