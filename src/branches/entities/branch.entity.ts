import { Franchise } from 'src/franchises/entities/franchise.entity';
import { Stock } from 'src/stock/entities/stock.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80, nullable: false })
  name: string;

  @ManyToOne(() => Franchise, (franchise) => franchise.id, {
    eager: true,
  })
  franchise: Franchise;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Stock, (stock) => stock.products)
  stock: Stock;
}
