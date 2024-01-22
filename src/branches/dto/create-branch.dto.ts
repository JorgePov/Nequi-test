import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  franchiseId: number;
}
