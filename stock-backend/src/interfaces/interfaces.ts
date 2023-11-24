export interface IBroker{
  id: number,
  name: string,
  balance: number,
  stocks?: IStock[]
};

export interface IAddBroker {
  name: string,
  balance: number
}

export interface IStock {
  id: number,
  label: string,
  name: string,
  price: number,
  date?: string
}

export interface IBrokerPortfolioItem {
  id: number,
  count: number,
  price: number
}

export interface IBrokerPortfolio {
  brokerId: number,
  stocks?: IBrokerPortfolioItem[]
}

export interface IStockData {
  date: string,
  open: string
}

export interface IHistoricalData {
  id: number,
  label: string,
  stocks: IStockData[]
}

export interface ISettings {
  speed: number,
  startDate: string,
  currentDate: string,
  chosenStocks: IStock[],
  isStarted: boolean
}

export interface IBuyData {
  brokerId: number,
  stockId: number,
  price: number,
  count: number
}