import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SettingsService } from 'src/settings/settings.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePricelistDto } from './dto/create-pricelist.dto';
import { UpdatePricelistDto } from './dto/update-pricelist.dto';
import { Pricelist } from './entities/pricelist.entity';

@Injectable()
export class PricelistService {

  constructor(
    @InjectRepository(Pricelist) private PricelistRespository: Repository<Pricelist>,
    private readonly SettingsService: SettingsService
  ) {}


  allSetting(){
    return this.SettingsService.findAll()
  }


  async findAll(){
    return await this.PricelistRespository.find({where: {deleted: false},order:{name: 'ASC'}})
  }

  async create(CreatePricelistDto: CreatePricelistDto) {
    const newCiro = await this.PricelistRespository.create(CreatePricelistDto) 
    return await this.PricelistRespository.save(newCiro)
  }


  findOne(id: string) {
    return  this.PricelistRespository.findOne({where:{id:id, deleted:false}})
  }

  async update(UpdatePricelistDto: UpdatePricelistDto) {
    return await this.PricelistRespository.update(UpdatePricelistDto.id,UpdatePricelistDto)
  }

  remove(id: string) {
    return this.PricelistRespository.update(id,{deleted:true})
  }


  
}
