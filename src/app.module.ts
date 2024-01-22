import { ConfigModule } from '@nestjs/config';
import { FranchisesModule } from './franchises/franchises.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchesModule } from './branches/branches.module';
import { ProductsModule } from './products/products.module';
import { StockModule } from './stock/stock.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    FranchisesModule,
    BranchesModule,
    ProductsModule,
    StockModule,
    ReportsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
