import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { ProductsService } from 'src/products/products.service';
import { BranchesService } from 'src/branches/branches.service';
import { MaxStock } from 'src/stock/interfaces/max-stock.interface';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,

    private readonly productsService: ProductsService,
    private readonly branchesService: BranchesService,
  ) {}
  async create(createStockDto: CreateStockDto) {
    const validBranche = await this.branchesService.findOne(
      createStockDto.branchId,
    );

    const validProduct = await this.productsService.findOne(
      createStockDto.productId,
    );

    if (validProduct.franchise.id !== validBranche.franchise.id) {
      throw new BadRequestException(
        'Product and branch must belong to the same franchise',
      );
    }

    const validStock = await this.stockRepository.find({
      where: {
        branches: {
          id: validProduct.franchise.id,
        },
        products: {
          id: validBranche.franchise.id,
        },
      },
    });

    if (validStock.length !== 0) {
      throw new BadRequestException('Product already exists in branch');
    }

    const newStock = this.stockRepository.create({
      ...createStockDto,
      products: validProduct,
      branches: validBranche,
    });
    return await this.stockRepository.save(newStock);
  }

  async findAll() {
    return await this.stockRepository.find();
  }

  async findOne(id: number) {
    const stockById = await this.stockRepository.findOneBy({ id });

    if (!stockById) {
      throw new BadRequestException('Stock not found');
    }

    return stockById;
  }

  async update(id: number, updateStockDto: UpdateStockDto) {
    await this.findOne(id);

    try {
      await this.stockRepository.update(id, updateStockDto);

      return { message: 'Stock updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      await this.stockRepository.delete({ id });

      return { message: 'Stock deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getMaxStockByBranches(branchIds: number[]): Promise<MaxStock[]> {
    const queryBuilder = await this.stockRepository
      .createQueryBuilder('stock')
      .innerJoinAndSelect('stock.products', 'product')
      .innerJoinAndSelect('stock.branches', 'branch')
      .innerJoin(
        (subQuery) =>
          subQuery
            .select(['s.branchesId', 'MAX(s.units) as max_unit'])
            .from(Stock, 's')
            .groupBy('s.branchesId'),
        'sq',
        'sq.branchesId = stock.branchesId AND stock.units = sq.max_unit',
      )
      .select([
        'product.name as product',
        'branch.name as branch',
        'stock.units as units',
      ])
      .where('stock.branchesId IN (:...branchIds)', { branchIds });

    return queryBuilder.getRawMany<MaxStock>();
  }
}
