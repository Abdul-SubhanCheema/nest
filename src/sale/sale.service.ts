import { Injectable } from '@nestjs/common';
import { Sale } from './entity/sale.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SaleService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}
  create() {
    console.log('create sale');
  }
  update() {
    console.log('update sale');
  }
  remove() {
    console.log('remove sale');
  }
  findone() {
    console.log('find one sale');
  }
}
