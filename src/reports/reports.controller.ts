import { Controller, Get, Param } from '@nestjs/common';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('franchises/:id')
  franchisesReport(@Param('id') id: string) {
    return this.reportsService.moreStockReport(+id);
  }
}
