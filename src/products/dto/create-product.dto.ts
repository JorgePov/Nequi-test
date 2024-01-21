import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;
}
