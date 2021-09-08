import { Injectable } from '@nestjs/common';
import { CiroService } from 'src/ciro/ciro.service';
import { Ciro } from 'src/ciro/entities/ciro.entity';
import { Expense } from 'src/expenses/entities/expense.entity'
import { ExpensesService } from 'src/expenses/expenses.service';
import { TypeExpense } from 'src/expenses/entities/type.expense.entity';
import { createQueryBuilder, getConnection } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { SettingsService } from 'src/settings/settings.service';


@Injectable()
export class ReportsService {

  constructor(
    private readonly CiroService: CiroService, 
    private readonly ExpensesService: ExpensesService,
    private readonly SettingsService: SettingsService
    ){}

  
  allSetting(){
    return this.SettingsService.findAll()
  }

  allTypeExpenses(){
    return this.ExpensesService.findAllTypeExpenses()
  }

  ciroBetween(start: string, end: string){
    return  this.CiroService.ciroBetween(start,end)
  }

  expensesBetween(start: string, end: string){
    return this.ExpensesService.expensesBetween(start,end)
  }

 typeBetween(type,start,end){
    return  this.ExpensesService.typeBetween(type,start,end)
  }


  // findTypeName(id: string){
  //   return  getConnection().createQueryBuilder().select('name').from(TypeExpense, 'type').where('type.id= :id', {id:id }).execute()
  // }

}
