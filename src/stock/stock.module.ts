import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { ProductsModule } from 'src/products/products.module';
import { BranchesModule } from 'src/branches/branches.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), BranchesModule, ProductsModule],
  controllers: [StockController],
  providers: [StockService],
  exports: [StockService],
})
export class StockModule {}
