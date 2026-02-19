import { Body, Controller, Param, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { createCustomerDto } from './dtos/createcustomer.dto';
import { updateCustomerDto } from './dtos/updatecustomer.dto';
import { RemoveCustomerDto } from './dtos/removecustomer.dto';
import { FindCustomerDto } from './dtos/findcustomer.dto';
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Post()
  create(@Body() createCustomerDto: createCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }
  @Post(':id')
  update(@Param() updateCustomerDto: updateCustomerDto) {
    return this.customerService.update(updateCustomerDto);
  }
  @Post(':id')
  remove(@Param() removeCustomerDto: RemoveCustomerDto) {
    return this.customerService.remove(removeCustomerDto);
  }
  @Post(':id')
  findone(@Param() findCustomerDto: FindCustomerDto) {
    return this.customerService.findone(findCustomerDto);
  }
}
