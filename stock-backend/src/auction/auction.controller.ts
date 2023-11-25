import { Body, Controller, Header, Post } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { IBuyData } from 'src/interfaces/interfaces';


@Controller('auction')
export class AuctionController {
  constructor(private auctionService: AuctionService) {

  };

  // //Ну тут был прикол с httpCode...
  // @Post('buy')
  // @Header('Content-Type', 'application/json')
  // async buyStock(@Body() data: IBuyData) {
  //   return await this.auctionService.buyStock(data);
  // }

  // @Post('sell')
  // @Header('Content-Type', 'application/json')
  // async sellStock(@Body() data: IBuyData) {
  //   return await this.auctionService.sellStock(data);
  // }
}
