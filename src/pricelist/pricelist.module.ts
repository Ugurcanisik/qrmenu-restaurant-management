import { Module } from '@nestjs/common';
import { PricelistService } from './pricelist.service';
import { PricelistController } from './pricelist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/orm.config';
import { Pricelist } from './entities/pricelist.entity';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature([Pricelist]),SettingsModule],
  controllers: [PricelistController],
  providers: [PricelistService]
})
export class PricelistModule {}
