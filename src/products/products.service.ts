import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create({
      ...createProductDto,
    });
    return await this.productsRepository.save(newProduct);
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const productById = await this.productsRepository.findOneBy({ id });

    if (!productById) {
      throw new BadRequestException('Product not found');
    }

    return productById;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    try {
      await this.productsRepository.update(id, updateProductDto);

      return { message: 'Product updated successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    try {
      await this.productsRepository.softDelete({ id });

      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
