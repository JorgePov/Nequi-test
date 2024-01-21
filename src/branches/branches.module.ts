import { Module } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { BranchesController } from './branches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { FranchisesModule } from 'src/franchises/franchises.module';
import { FranchisesService } from 'src/franchises/franchises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Branch]), FranchisesModule],
  controllers: [BranchesController],
  providers: [BranchesService, FranchisesService],
  exports: [TypeOrmModule, BranchesService],
})
export class BranchesModule {}
