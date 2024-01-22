import { BadRequestException, Injectable } from '@nestjs/common';
import { BranchesService } from 'src/branches/branches.service';
import { FranchisesService } from 'src/franchises/franchises.service';
import { MaxStock } from 'src/stock/interfaces/max-stock.interface';
import { StockService } from 'src/stock/stock.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly franchisesService: FranchisesService,
    private readonly branchesService: BranchesService,
    private readonly stockService: StockService,
  ) {}

  async moreStockReport(id: number): Promise<MaxStock[]> {
    await this.franchisesService.findOne(id);

    const branches = await this.branchesService.findByFranchise(id);
    if (branches.length === 0) {
      throw new BadRequestException('this franchise has no branches');
    }

    const branchIds = branches.map((branch) => branch.id);

    const stock = await this.stockService.getMaxStockByBranches(branchIds);

    if (stock.length === 0) {
      throw new BadRequestException('this franchise has no products in stock');
    }

    return stock;
  }
}
