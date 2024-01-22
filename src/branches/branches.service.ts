import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { FranchisesService } from 'src/franchises/franchises.service';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    private readonly franchisesService: FranchisesService,
  ) {}

  async create(createBranchDto: CreateBranchDto) {
    const validFranchise = await this.franchisesService.findOne(
      createBranchDto.franchiseId,
    );

    const newPost = this.branchRepository.create({
      ...createBranchDto,
      franchise: validFranchise,
    });
    return await this.branchRepository.save(newPost);
  }

  async findAll() {
    return await this.branchRepository.find();
  }

  async findOne(id: number): Promise<Branch> {
    const branchById = await this.branchRepository.findOneBy({ id });

    if (!branchById) {
      throw new BadRequestException('Branch not found');
    }

    return branchById;
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    await this.findOne(id);

    try {
      await this.branchRepository.update(id, updateBranchDto);

      return { message: 'Branch updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      await this.branchRepository.softDelete({ id });

      return { message: 'Branch deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findByFranchise(franchiseId: number): Promise<Branch[]> {
    return await this.branchRepository.find({
      where: {
        franchise: {
          id: franchiseId,
        },
      },
    });
  }
}
