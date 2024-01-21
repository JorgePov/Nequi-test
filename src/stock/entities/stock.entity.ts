import { Branch } from 'src/branches/entities/branch.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  units: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Branch, (branch) => branch.id, {
    eager: true,
  })
  branches: Branch;

  @ManyToOne(() => Product, (product) => product.id, {
    eager: true,
  })
  products: Product;
}
