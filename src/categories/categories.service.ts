import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import seoUrl from '../function/function';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private CategoryRepository: Repository<Category>,
    private readonly SettingsService: SettingsService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newUser = await this.CategoryRepository.create(createCategoryDto);
    return await this.CategoryRepository.save(newUser);
  }

  allSetting() {
    return this.SettingsService.findAll();
  }

  async findAll() {
    return await this.CategoryRepository.find({
      where: { deleted: false },
      order: { order: 'ASC' },
    });
  }

  async allCategoryQr() {
    const dizi = [];

    const category = await this.CategoryRepository.find({
      where: { deleted: false, isactive: true },
      order: { order: 'ASC' },
    });

    for (let index = 0; index < category.length; index++) {
      const id = category[index].id;
      const name = category[index].name;

      const dene = {
        name: name,
        seoUrl: seoUrl(name),
      };

      dizi.push(dene);
    }

    return dizi;
  }

  async findAllOrderName() {
    return await this.CategoryRepository.find({
      where: { deleted: false },
      order: { name: 'ASC' },
    });
  }

  findOne(id: string) {
    return this.CategoryRepository.findOne({
      where: { id: id, deleted: false },
    });
  }

  async update(updateCategoryDto: UpdateCategoryDto) {
    return await this.CategoryRepository.update(
      updateCategoryDto.id,
      updateCategoryDto,
    );
  }

  remove(id: string) {
    return this.CategoryRepository.update({ id: id }, { deleted: true });
    //  getConnection().createQueryBuilder().update(Category).set({deleted:true}).where({id:id}).execute()
  }

  isActive(id: string, data: boolean) {
    return this.CategoryRepository.update(id, { isactive: data });
  }

  orders(id: any, order: number) {
    return getConnection()
      .createQueryBuilder()
      .update(Category)
      .set({ order: order })
      .where({ id: id })
      .andWhere(`(order != ${order} )`)
      .execute();
  }
}
