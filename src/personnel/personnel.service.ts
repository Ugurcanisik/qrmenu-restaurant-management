import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SettingsService } from 'src/settings/settings.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePersonnelDto } from './dto/create-personnel.dto';
import { UpdatePersonnelDto } from './dto/update-personnel.dto';
import { Personnel } from './entities/personnel.entity';

@Injectable()
export class PersonnelService {


  constructor(
  @InjectRepository(Personnel) private PersonnelRespository: Repository<Personnel>,
  private readonly SettingsService: SettingsService
  ) {}


  async findAll(){
    return await this.PersonnelRespository.find({where:{deleted:false}})
  }

  allSetting(){
    return this.SettingsService.findAll()
  }


  async frontFindAll(){
    return await this.PersonnelRespository.find({where:{deleted:false, isactive:true}})
  }


  async create(createPersonnelDto: CreatePersonnelDto) {
    const newPersonnel = await this.PersonnelRespository.create(createPersonnelDto) 
    return await this.PersonnelRespository.save(newPersonnel)
  }


  async findOne(id: string) {
    return await this.PersonnelRespository.findOne({where:{id:id, deleted:false}})
  }

  async update(updatePersonnelDto: UpdatePersonnelDto) {
    return await this.PersonnelRespository.update(updatePersonnelDto.id,updatePersonnelDto)
  }

  isActive(id: string, data: boolean){
    return this.PersonnelRespository.update(id,{isactive:data})
  }

  async remove(id: string) {
    return await this.PersonnelRespository.update(id,{deleted:true})
  }
}
