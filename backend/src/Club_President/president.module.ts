import { Module } from '@nestjs/common';
import { PresidentController } from './president.controller';
import { PresidentService } from './president.service';

@Module({
  imports: [],
  controllers: [PresidentController],
  providers: [PresidentService],
})
export class PresidentModule {}
