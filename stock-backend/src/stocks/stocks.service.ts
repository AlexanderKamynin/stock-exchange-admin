import { Injectable } from '@nestjs/common';
import { IHistoricalData, IStock } from '../interfaces/interfaces'
import * as fs from 'fs';

@Injectable()
export class StocksService {
  private stocks: IStock[];
  private historicalData: IHistoricalData[];

  constructor() {
    const stocksJSON: Buffer = fs.readFileSync('./src/json/stocks.json');
    this.stocks = JSON.parse(String(stocksJSON));

    const historicalJSON: Buffer = fs.readFileSync('./src/json/historicalStocks.json');
    this.historicalData = JSON.parse(String(historicalJSON));
  }

  async getAllStocks() {
    return this.stocks;
  }

  async getHistoricalData() {
    return this.historicalData;
  }
}
