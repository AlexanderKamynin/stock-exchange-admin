import { Controller, Get, Header } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private stocksService: StocksService) {};

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllStocks() {
    return await this.stocksService.getAllStocks();
  }

  @Get('historicalData')
  @Header('Content-Type', 'application/json')
  async getHistoricalData() {
    return await this.stocksService.getHistoricalData();
  }
}
