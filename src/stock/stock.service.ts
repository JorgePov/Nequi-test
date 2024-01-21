import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { Branch } from 'src/branches/entities/branch.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async create(createStockDto: CreateStockDto) {
    const validBranche = await this.branchRepository.findOneBy({
      id: createStockDto.branchId,
    });

    if (!validBranche) {
      throw new BadRequestException('Branche not found');
    }

    const validProduct = await this.productRepository.findOneBy({
      id: createStockDto.productId,
    });

    if (!validProduct) {
      throw new BadRequestException('Product not found');
    }

    const newPost = this.stockRepository.create({
      ...createStockDto,
      products: validProduct,
      branches: validBranche,
    });
    return await this.stockRepository.save(newPost);
  }

  async findAll() {
    return await this.stockRepository.find();
  }

  async findOne(id: number) {
    return await this.stockRepository.findOneBy({ id });
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    return await this.stockRepository.update(id, updateStockDto);
  }

  async remove(id: number) {
    return await this.stockRepository.delete({ id });
  }
}
