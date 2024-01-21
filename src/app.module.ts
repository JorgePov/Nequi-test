import { ConfigModule } from '@nestjs/config';
import { FranchisesModule } from './franchises/franchises.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchesModule } from './branches/branches.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'nequi_user',
      password: 'qweasdqwe',
      database: 'nequi_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FranchisesModule,
    BranchesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
