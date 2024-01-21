import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { Franchise } from 'src/franchises/entities/franchise.entity';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @InjectRepository(Franchise)
    private readonly franchiseRepository: Repository<Franchise>,
  ) {}
  async create(createBranchDto: CreateBranchDto) {
    const validFranchise = await this.franchiseRepository.findOneBy({
      id: createBranchDto.franchiseId,
    });

    if (!validFranchise) {
      throw new BadRequestException('Franchise not found');
    }

    const newPost = this.branchRepository.create({
      ...createBranchDto,
      franchise: validFranchise,
    });
    return await this.branchRepository.save(newPost);
  }

  async findAll() {
    return await this.branchRepository.find();
  }

  async findOne(id: number) {
    return await this.branchRepository.findOneBy({ id });
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    return await this.branchRepository.update(id, updateBranchDto);
  }

  async remove(id: number) {
    return await this.branchRepository.softDelete({ id });
  }
}
