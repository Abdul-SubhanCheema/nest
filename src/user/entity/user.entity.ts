import { Category } from 'src/category/entity/category.entity';
import { Product } from 'src/product/entity/product.entity';
import { Sale } from 'src/sale/entity/sale.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  username: string;
  @Column({
    type: 'varchar',
    length: 20,
  })
  password: string;
  @Column({ default: true })
  isActive: boolean;
  @Column()
  role: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @OneToMany(() => Category, (category) => category.user)
  categories: Category[];

  @OneToMany(() => Sale, (sale) => sale.user)
  sales: Sale[];

  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
