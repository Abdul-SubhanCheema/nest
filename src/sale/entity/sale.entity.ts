import { Customer } from 'src/customer/entity/customer.entity';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  totalAmount: number;
  @Column()
  taxAmount: number;
  @Column()
  discountAmount: number;
  @Column()
  netAmount: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @ManyToOne(() => User, (user) => user.sales)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  userId: number;

  @ManyToOne(() => Customer, (customer) => customer.sales)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;
  @Column()
  customerId: number;


  @ManyToMany(()=>Product,(product)=>product.sales)
  @JoinTable()
  products:Product[];
}
