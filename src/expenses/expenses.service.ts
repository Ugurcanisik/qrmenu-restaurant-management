import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, getConnection, Like, Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { TypeExpense } from './entities/type.expense.entity';
import { date } from 'src/date';
import { PersonnelService } from 'src/personnel/personnel.service';
import { SettingsService } from 'src/settings/settings.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense) private ExpensesRespository: Repository<Expense>,
    @InjectRepository(TypeExpense)
    private typeExpenseRepository: Repository<TypeExpense>,
    private readonly personnelService: PersonnelService,
    private readonly SettingsService: SettingsService,
  ) {}

  allPersonnel() {
    return this.personnelService.frontFindAll();
  }

  allSetting() {
    return this.SettingsService.findAll();
  }

  async create(createExpenseDto: CreateExpenseDto) {
    const newExpenses = await this.ExpensesRespository.create(createExpenseDto);
    return await this.ExpensesRespository.save(newExpenses);
  }

  async createTypeExpense(typeName) {
    const newType = await this.typeExpenseRepository.create(typeName);
    return await this.typeExpenseRepository.save(newType);
  }

  findAll() {
    return this.ExpensesRespository.find({
      relations: ['typeexpense', 'personnel'],
      where: { deleted: false, date: Like(`${date.getYearandMonth()}%`) },
    });
  }

  // allTypeExpenses(){
  //   return this.TypeExpensesRespository.find({where:{deleted:false}, order:{name:'ASC'}})
  // }

  findAllTypeExpenses() {
    return this.typeExpenseRepository.find({
      where: { deleted: false },
      order: { name: 'ASC' },
    });
  }

  findOne(id: string) {
    return this.ExpensesRespository.findOne({
      relations: ['typeexpense', 'personnel'],
      where: { id: id, deleted: false },
    });
  }

  async update(updateExpenseDto: UpdateExpenseDto) {
    return await this.ExpensesRespository.update(
      updateExpenseDto.id,
      updateExpenseDto,
    );
  }

  remove(id: string) {
    return this.ExpensesRespository.update(id, { deleted: true });
    //  getConnection().createQueryBuilder().update(Category).set({deleted:true}).where({id:id}).execute()
  }

  async todayExpenses() {
    const today = await getConnection()
      .createQueryBuilder()
      .select('SUM(total) as today')
      .from(Expense, 'expenses')
      .where('expenses.date like :id', { id: `${date.fullDateTr()}%` })
      .andWhere('expenses.deleted = false')
      .execute();
    if (typeof today[0] != 'undefined') {
      return today[0]['today'];
    } else {
      return;
    }
  }

  async monthlyExpenses() {
    const monthly = await getConnection()
      .createQueryBuilder()
      .select('SUM(total) monthly')
      .from(Expense, 'expenses')
      .where('expenses.date like :id', { id: `${date.getYearandMonth()}%` })
      .andWhere('expenses.deleted = false')
      .execute();
    if (typeof monthly[0] != 'undefined') {
      return monthly[0]['monthly'];
    } else {
      return;
    }
  }

  async expensesBetween(start: string, end: string) {
    return await createQueryBuilder('Expense')
      .select('sum(Expense.total)')
      .innerJoinAndSelect(
        'Expense.typeexpense',
        'TypeExpense',
        'Expense.date between :start and :end',
        { start: start, end: end },
      )
      .where('Expense.deleted = false')
      .groupBy('TypeExpense.id')
      .execute();
  }

  typeBetween(type, start, end) {
    return getConnection()
      .createQueryBuilder()
      .select()
      .from(Expense, 'expense')
      .where('expense.typeexpense = :id ', { id: type })
      .andWhere('expense.date between :start and :end ', {
        start: start,
        end: end,
      })
      .andWhere('Expense.deleted = false')
      .execute();
  }

  async chartExpenses() {
    const allExpenses = await this.ExpensesRespository.find({
      where: { deleted: false, date: Like(`${date.getYear()}%`) },
      order: { date: 'ASC' },
    });

    const month = [];
    let mont = '';
    let totalExpenses = '';

    allExpenses.forEach(function (key, value) {
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
        .select('SUM(total) as totalexpenses')
        .from(Expense, 'expense')
        .where('expense.date like :id', { id: `${element}%` })
        .andWhere('Expense.deleted = false')
        .execute();
      totalExpenses += `${total[0].totalexpenses},`;
    }

    return { month: mont, totalExpenses: totalExpenses };
  }
}
