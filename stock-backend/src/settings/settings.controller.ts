import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { ISettings } from 'src/interfaces/interfaces';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {

  };

  @Get()
  @Header('Content-Type', 'application/json')
  async getSettings() {
    return await this.settingsService.getSettings();
  }

  @Post()
  async update(@Body() settings: ISettings)
  {
    await this.settingsService.updateSettings(settings);
  }

}
