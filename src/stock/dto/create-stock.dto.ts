import { IsNumber } from 'class-validator';

export class CreateStockDto {
  @IsNumber()
  units: number;

  @IsNumber()
  productId: number;

  @IsNumber()
  branchId: number;
}
