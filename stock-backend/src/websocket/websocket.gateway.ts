import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { SettingsService } from 'src/settings/settings.service';

@WebSocketGateway(3002, { transports: ['websocket'] })
export class WebsocketGateway {
  @WebSocketServer() private server: Server;
  private timer: any;

  constructor(
    private settingsService: SettingsService
  ) {}
}
