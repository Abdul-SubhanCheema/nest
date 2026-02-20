import { Category } from 'src/category/entity/category.entity';
import { Sale } from 'src/sale/entity/sale.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  name: string;
  @Column()
  price: number;
  @Column({
    type: 'varchar',
    length: 100,
  })
  description: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column()
  quantity: number;
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
  @Column()
  categoryId: number;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  userId: number;


  @ManyToMany(()=>Sale,(sale)=>sale.products)
  sales:Sale[];
}
