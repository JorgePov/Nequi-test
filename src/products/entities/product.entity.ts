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
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80, nullable: false })
  name: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column({ nullable: false })
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Stock, (stock) => stock.products)
  stock: Stock;

  @ManyToOne(() => Franchise, (franchise) => franchise.id, {
    eager: true,
  })
  franchise: Franchise;
}
