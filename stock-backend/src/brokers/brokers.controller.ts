import { Controller, Get, Post, Param, Body, Header } from '@nestjs/common';
import { BrokersService } from './brokers.service';

@Controller('brokers')
export class BrokersController {
  constructor(private brokerService: BrokersService) {};

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllBrokers()
  {
    return await this.brokerService.getAllBrokers();
  }

  @Get(':id')
  async getBrokerById(@Param('id') id: number)
  {
    return await this.brokerService.getBrokerById(id);
  }

  @Post()
  async addBroker(@Body() broker: any)
  {
    return await this.brokerService.addBroker(broker);
  }

  @Post()
  async deleteBroker(@Body() id: number)
  {
    return await this.brokerService.deleteBroker(id);
  }
}
