import { IsInt, IsPositive } from 'class-validator';

export class CreateStockDto {
  @IsInt()
  units: number;

  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  branchId: number;
}
