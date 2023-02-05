import { Inject, Injectable } from '@nestjs/common';
import {
  HERO_PACKAGE_NAME,
  Hero,
  HeroById,
  HeroesServiceClient,
} from './proto/hero.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private service: HeroesServiceClient;
  constructor(
    @Inject(HERO_PACKAGE_NAME)
    private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.service = this.client.getService<HeroesServiceClient>('HeroesService');
  }

  async getHero(payload: HeroById): Promise<Hero> {
    return firstValueFrom(this.service.findOne(payload), {
      defaultValue: null,
    });
  }
}
