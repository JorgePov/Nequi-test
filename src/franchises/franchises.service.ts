import { BadRequestException, Controller } from '@nestjs/common';
import { CreateFranchiseDto } from './dto/create-franchise.dto';
import { UpdateFranchiseDto } from './dto/update-franchise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Franchise } from './entities/franchise.entity';
import { Repository } from 'typeorm';

@Controller('franchises')
export class FranchisesService {
  constructor(
    @InjectRepository(Franchise)
    private readonly FranchiseRepository: Repository<Franchise>,
  ) {}
  async create(createFranchiseDto: CreateFranchiseDto) {
    const newFranchise = this.FranchiseRepository.create({
      ...createFranchiseDto,
    });
    return await this.FranchiseRepository.save(newFranchise);
  }

  async findAll() {
    return await this.FranchiseRepository.find();
  }

  async findOne(id: number) {
    const franchiseById = await this.FranchiseRepository.findOneBy({ id });

    if (!franchiseById) {
      throw new BadRequestException('Franchise not found');
    }

    return franchiseById;
  }

  async update(id: number, updateFranchiseDto: UpdateFranchiseDto) {
    const franchiseById = await this.FranchiseRepository.findOneBy({ id });

    if (!franchiseById) {
      throw new BadRequestException('Franchise not found');
    }

    return await this.FranchiseRepository.update(id, updateFranchiseDto);
  }

  async remove(id: number) {
    const franchiseById = await this.FranchiseRepository.findOneBy({ id });

    if (!franchiseById) {
      throw new BadRequestException('Franchise not found');
    }

    return await this.FranchiseRepository.softDelete({ id });
  }
}
