import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entity/sale.entity';

@Module({
  controllers: [SaleController],
  providers: [SaleService],
  imports: [TypeOrmModule.forFeature([Sale])],
})
export class SaleModule {}
