import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HERO_PACKAGE_NAME } from './proto/hero.pb';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: HERO_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50051',
          package: HERO_PACKAGE_NAME,
          protoPath: join('../proto/hero.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
