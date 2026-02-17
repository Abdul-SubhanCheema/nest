import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
