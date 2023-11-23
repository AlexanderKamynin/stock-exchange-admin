import { Injectable } from '@nestjs/common';
import { IHistoricalData, IStock } from 'src/interfaces/interfaces';
import { SettingsService } from 'src/settings/settings.service';
import { StocksService } from 'src/stocks/stocks.service';

@Injectable()
export class AuctionService {
  private selectedCompaniesId: number[];
  private historicalData: IHistoricalData[];
  private timer: any;

  constructor(
    private settings: SettingsService,
    private stockService: StocksService
  ) {};

  async startAuction() {
    const { startDate, chosenStocks } = this.settings.getSettings();
    this.selectedCompaniesId = AuctionService.getSelectedCompanies(chosenStocks);

    this.historicalData = await this.stockService.getHistoricalData();
    const dataIdx  = this.findIdxDataByDate(new Date(startDate));
    const updatedStocks = await this.getNewPrices(dataIdx);

    console.log(updatedStocks);

    return { updatedStocks, dataIdx };
  }

  async getNewPrices(dataIdx: number) {
    const stocks: IStock[] = await this.stockService.getAllStocks();

    const chosenStocks = stocks.filter((stock) =>
      this.selectedCompaniesId.includes(stock.id)
    );

    const updatedStocks: IStock[] = chosenStocks.map((stock) => {
      const data = this.historicalData.find(
        (data) => data.id === stock.id
      ).stocks;

      return {
        id: stock.id,
        label: stock.label,
        name: stock.name,
        price: parseFloat(data[dataIdx].open),
        date: data[dataIdx].date
      };
    });

    return JSON.stringify(updatedStocks);
  }

  private findIdxDataByDate(startDate: Date) {
    let currentDate: Date;
    for(const [idx, stock] of this.historicalData[0].stocks.entries()) {
      currentDate = new Date(stock.date);
      if(currentDate <= startDate) {
        return idx;
      }
    }
    return this.historicalData[0].stocks.length - 1;
  }

  private static getSelectedCompanies(chosenStocks: IStock[]) {
    const companiesId = [];
    for (const stock of chosenStocks) {
      companiesId.push(stock.id);
    }

    return companiesId;
  }
}
