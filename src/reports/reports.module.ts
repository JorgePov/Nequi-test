import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { FranchisesModule } from 'src/franchises/franchises.module';
import { BranchesModule } from 'src/branches/branches.module';
import { StockModule } from 'src/stock/stock.module';

@Module({
  imports: [FranchisesModule, BranchesModule, StockModule],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
