import { Sale } from 'src/sale/entity/sale.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'varchar',
    length: 20,
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 11,
    unique: true,
  })
  phoneNo: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Sale, (sale) => sale.customer)
  sales: Sale[];
}
