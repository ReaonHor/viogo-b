import { Module } from '@nestjs/common';
import { VioService } from './vio.service';
import { VioController } from './vio.controller';

@Module({
  controllers: [VioController],
  providers: [VioService]
})
export class VioModule {}
