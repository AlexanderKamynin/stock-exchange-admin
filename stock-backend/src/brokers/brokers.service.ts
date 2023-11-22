import { Injectable } from '@nestjs/common';
import { IBroker } from 'src/interfaces/interfaces';
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

  async addBroker(broker: IBroker) {

  }

  async deleteBroker(id: number) {

  }
}
