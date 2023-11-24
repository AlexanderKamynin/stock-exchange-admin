import { Injectable } from '@nestjs/common';
import { BrokersService } from 'src/brokers/brokers.service';
import { IBrokerPortfolioItem, IBuyData, IHistoricalData, IStock } from 'src/interfaces/interfaces';
import { SettingsService } from 'src/settings/settings.service';
import { StocksService } from 'src/stocks/stocks.service';

@Injectable()
export class AuctionService {
  private selectedCompaniesId: number[];
  private historicalData: IHistoricalData[];
  private timer: any;

  constructor(
    private settings: SettingsService,
    private stockService: StocksService,
    private brokerService: BrokersService
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
    console.log(updatedStocks);
    return updatedStocks;
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

  async buyStock(data: IBuyData) {
    let brokerBalance = await this.brokerService.getBrokerBalance(data.brokerId);
    let newBalance = brokerBalance - data.count * data.price;

    if(newBalance >= 0) {
      let brokerPortfolio = await this.brokerService.getBrokerPortfolio(data.brokerId);

      let stockPortfolio = brokerPortfolio.stocks.find((item: IBrokerPortfolioItem) => {
        return item.id === data.stockId;
      }); // JSON с портфолио составлен таким образом, что всегда найдется элемент с нужным id
      stockPortfolio.price = data.price; // обновление цены в соответствиии с текущим курсом биржи

      let portfolioCopy = JSON.parse(JSON.stringify(stockPortfolio)); // для глубокого копирования

      stockPortfolio.count += data.count;
      portfolioCopy.count += data.count;

      await this.brokerService.setBrokerBalance(data.brokerId, newBalance);
      return portfolioCopy;
    }
    
    return { isOk: false,
      reason: "You don't have enough money =(" };
  }

  async sellStock(data: IBuyData) {
    let brokerPortfolio = await this.brokerService.getBrokerPortfolio(data.brokerId);

    let stockPortfolio = brokerPortfolio.stocks.find((item: IBrokerPortfolioItem) => {
      return item.id === data.stockId;
    }); // JSON с портфолио составлен таким образом, что всегда найдется элемент с нужным id

    if(stockPortfolio.count >= data.count) {
      let brokerBalance = await this.brokerService.getBrokerBalance(data.brokerId);
      await this.brokerService.setBrokerBalance(data.brokerId, brokerBalance + data.count * data.price);

      let portfolioCopy = JSON.parse(JSON.stringify(stockPortfolio));

      stockPortfolio.count -= data.count;
      portfolioCopy.count -= data.count;

      return portfolioCopy;
    }

    return {
      isOk: false,
      reason: "You try to sell more stocks that you have"
    };
  }
}
