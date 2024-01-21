import { IsString } from 'class-validator';

export class UpdateBranchDto {
  @IsString()
  name: string;
}
