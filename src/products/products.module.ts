import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoriesModule } from 'src/categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/orm.config';
import { Product } from './entities/product.entity';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Product]),CategoriesModule,SettingsModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports:[ProductsService]
})
export class ProductsModule {}
