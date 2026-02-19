import { IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/product/entity/product.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;
  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  userId: number;
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
