import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/orm.config';
import { Category } from './entities/category.entity';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Category]),SettingsModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports:[CategoriesService]
})
export class CategoriesModule {}
