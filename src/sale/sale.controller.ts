import { Controller, Post } from '@nestjs/common';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}
  @Post()
  create() {
    this.saleService.create();
  }
  @Post(':id')
  update() {
    this.saleService.update();
  }
  @Post(':id')
  remove() {
    this.saleService.remove();
  }
  @Post(':id')
  findone() {
    this.saleService.findone();
  }
}
