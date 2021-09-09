import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SettingsService } from 'src/settings/settings.service';
import { Repository } from 'typeorm';
import { CreatePricelistDto } from './dto/create-pricelist.dto';
import { UpdatePricelistDto } from './dto/update-pricelist.dto';
import { Pricelist } from './entities/pricelist.entity';

@Injectable()
export class PricelistService {
  constructor(
    @InjectRepository(Pricelist)
    private PrickliestRepository: Repository<Pricelist>,
    private readonly SettingsService: SettingsService,
  ) {}

  allSetting() {
    return this.SettingsService.findAll();
  }

  async findAll() {
    return await this.PrickliestRepository.find({
      where: { deleted: false },
      order: { name: 'ASC' },
    });
  }

  async create(CreatePricelistDto: CreatePricelistDto) {
    const newCiro = await this.PrickliestRepository.create(CreatePricelistDto);
    return await this.PrickliestRepository.save(newCiro);
  }

  findOne(id: string) {
    return this.PrickliestRepository.findOne({
      where: { id: id, deleted: false },
    });
  }

  async update(UpdatePricelistDto: UpdatePricelistDto) {
    return await this.PrickliestRepository.update(
      UpdatePricelistDto.id,
      UpdatePricelistDto,
    );
  }

  remove(id: string) {
    return this.PrickliestRepository.update(id, { deleted: true });
  }
}
