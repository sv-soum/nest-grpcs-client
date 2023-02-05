import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { HeroById } from './proto/hero.pb';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/heroes/:id')
  getHero(@Param() params: HeroById) {
    return this.appService.getHero(params);
  }
}
