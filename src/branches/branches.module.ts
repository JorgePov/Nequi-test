import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { FranchisesService } from 'src/franchises/franchises.service';
import { Franchise } from 'src/franchises/entities/franchise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Franchise])],
  controllers: [BranchesController],
  providers: [BranchesService, FranchisesService],
})
export class BranchesModule {}
