import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
} from '@nestjs/common';
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

  async findOne(id: number): Promise<Franchise> {
    const franchiseById = await this.FranchiseRepository.findOneBy({ id });

    if (!franchiseById) {
      throw new BadRequestException('Franchise not found');
    }

    return franchiseById;
  }

  async update(id: number, updateFranchiseDto: UpdateFranchiseDto) {
    await this.findOne(id);

    try {
      await this.FranchiseRepository.update(id, updateFranchiseDto);

      return { message: 'Franchise updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      await this.FranchiseRepository.softDelete({ id });

      return { message: 'Franchise deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
