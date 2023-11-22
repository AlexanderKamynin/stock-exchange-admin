import { Injectable } from '@nestjs/common';
import { IAddBroker, IBroker } from 'src/interfaces/interfaces';
import * as fs from 'fs';


@Injectable()
export class BrokersService {
  private brokers: IBroker[];

  constructor() {
    const brokersJson: Buffer = fs.readFileSync('./src/json/brokers.json');
    this.brokers = JSON.parse(String(brokersJson));
  }

  async getAllBrokers() {
    return this.brokers;
  }

  async getBrokerById(id: number) {
    //писька
  }

  async addBroker(broker: IAddBroker) {
    let maxId: number | undefined = this.brokers.reduce((max, broker) => {
      return broker.id > max ? broker.id : max;
    }, -1);
    maxId = maxId === undefined ? 0 : maxId;

    let newBroker: IBroker = {
      id: maxId + 1,
      name: broker.name,
      balance: broker.balance
    }

    this.brokers.push(newBroker);
    return newBroker;
  }

  async deleteBroker(id: number) {

  }
}