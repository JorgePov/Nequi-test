import { IsString } from 'class-validator';

export class CreateFranchiseDto {
  @IsString()
  name: string;
}
