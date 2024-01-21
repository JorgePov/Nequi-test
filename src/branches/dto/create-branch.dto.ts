import { IsInt, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;
  @IsInt()
  franchiseId: number;
}
