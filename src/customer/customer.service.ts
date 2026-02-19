import { Injectable } from '@nestjs/common';
import { createCustomerDto } from './dtos/createcustomer.dto';
import { Repository } from 'typeorm';
import { Customer } from './entity/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { updateCustomerDto } from './dtos/updatecustomer.dto';
import { FindCustomerDto } from './dtos/findcustomer.dto';
import { RemoveCustomerDto } from './dtos/removecustomer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  async create(createCustomerDto: createCustomerDto) {
    const customer = await this.customerRepository.findOne({
      where: { phoneNo: createCustomerDto.phoneNo },
    });
    let newCustomer = this.customerRepository.create(createCustomerDto);
    newCustomer = await this.customerRepository.save(newCustomer);
    return newCustomer;
  }
  update(updateCustomerDto: updateCustomerDto) {
    console.log('update customer');
  }
  remove(removeCustomerDto: RemoveCustomerDto) {
    console.log('remove customer');
  }
  findone(findCustomerDto: FindCustomerDto) {
    console.log('find one customer');
  }
}
