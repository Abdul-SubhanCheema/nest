import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
