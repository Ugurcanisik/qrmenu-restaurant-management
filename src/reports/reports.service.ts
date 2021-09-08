import { Injectable } from '@nestjs/common';
import { CiroService } from 'src/ciro/ciro.service';
import { ExpensesService } from 'src/expenses/expenses.service';
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
