import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, getRepository, Like, Repository } from 'typeorm';
import { CreateCiroDto } from './dto/create-ciro.dto';
import { UpdateCiroDto } from './dto/update-ciro.dto';
import { Ciro } from './entities/ciro.entity';
import { date } from 'src/date';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class CiroService {
  constructor(
    @InjectRepository(Ciro) private CiroRespository: Repository<Ciro>,
    private readonly SettingsService: SettingsService,
  ) {}

  allSetting() {
    return this.SettingsService.findAll();
  }

  async findAll() {
    // return await this.CiroRespository.find({where: {deleted: false},order:{date: 'DESC'}})
    return getConnection()
      .createQueryBuilder()
      .select()
      .from(Ciro, 'ciro')
      .where('ciro.date like :id', { id: `${date.getYearandMonth()}%` })
      .andWhere('ciro.deleted = false')
      .execute();
  }

  async create(CreateCiroDto: CreateCiroDto) {
    const newCiro = await this.CiroRespository.create(CreateCiroDto);
    return await this.CiroRespository.save(newCiro);
  }

  async totalCiro() {
    const totalCiro = await getConnection()
      .createQueryBuilder()
      .select('SUM(total) as totalciro')
      .from(Ciro, 'ciro')
      .where('ciro.date like :id', { id: `${date.getYearandMonth()}%` })
      .andWhere('ciro.deleted = false')
      .execute();

    if (typeof totalCiro[0] != 'undefined') {
      return totalCiro[0]['totalciro'];
    } else {
      return;
    }
  }

  async yesterdayCiro() {
    const yesterday = await getConnection()
      .createQueryBuilder()
      .select('total')
      .from(Ciro, 'ciro')
      .where('ciro.date like :id', { id: `${date.yesterday()}%` })
      .andWhere('ciro.deleted = false')
      .execute();

    if (typeof yesterday[0] != 'undefined') {
      return yesterday[0]['total'];
    } else {
      return;
    }
  }

  async averageCiro() {
    const average = await getConnection()
      .createQueryBuilder()
      .select('SUM(total) as averange')
      .from(Ciro, 'ciro')
      .where('ciro.date like :id', { id: `${date.getYearandMonth()}%` })
      .andWhere('ciro.deleted = false')
      .execute();

    if (typeof average[0] != 'undefined') {
      return Math.round(average[0]['averange'] / parseInt(date.getDay()));
    } else {
      return;
    }
  }

  async ciroBetween(start: string, end: string) {
    return await getConnection()
      .createQueryBuilder()
      .from(Ciro, 'ciro')
      .where('ciro.date between :start and :end ', { start: start, end: end })
      .andWhere('ciro.deleted = false')
      .execute();
  }

  async chartCiro() {
    const allCiro = await this.CiroRespository.find({
      where: { deleted: false, date: Like(`${date.getYear()}%`) },
      order: { date: 'ASC' },
    });
    const month = [];
    let mont = '';
    let totalCiro = '';

    allCiro.forEach(function (key, value) {
      const datesplit = key.date.split('-');
      if (!month.includes(datesplit[0] + '-' + datesplit[1])) {
        month.push(datesplit[0] + '-' + datesplit[1]);
        mont += datesplit[1] + ',';
      }
    });

    for (let index = 0; index < month.length; index++) {
      const element = month[index];
      const total = await getConnection()
        .createQueryBuilder()
        .select('SUM(total) as totalciro')
        .from(Ciro, 'ciro')
        .where('ciro.date like :id', { id: `${element}%` })
        .andWhere('ciro.deleted = false')
        .execute();
      totalCiro += `${total[0].totalciro},`;
    }

    return { month: mont, totalCiro: totalCiro };
  }

  findOne(id: string) {
    return this.CiroRespository.findOne({ where: { id: id, deleted: false } });
  }

  async update(UpdateCiroDto: UpdateCiroDto) {
    return await this.CiroRespository.update(UpdateCiroDto.id, UpdateCiroDto);
  }

  remove(id: string) {
    return this.CiroRespository.update(id, { deleted: true });
  }
}
