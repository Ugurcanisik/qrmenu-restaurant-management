import { Injectable } from '@nestjs/common';
import { CiroService } from 'src/ciro/ciro.service';
import { ExpensesService } from 'src/expenses/expenses.service';
import { SettingsService } from 'src/settings/settings.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly userService: UsersService,
    private readonly ciroService: CiroService,
    private readonly expensesService: ExpensesService,
    private readonly SettingsService: SettingsService,
  ) {}

  findUser(userid: string) {
    return this.userService.findOne(userid);
  }

  allSetting() {
    return this.SettingsService.findAll();
  }

  totalCiro() {
    return this.ciroService.totalCiro();
  }

  averangeCiro() {
    return this.ciroService.averageCiro();
  }

  todayExpenses() {
    return this.expensesService.todayExpenses();
  }

  monthlyExpenses() {
    return this.expensesService.monthlyExpenses();
  }

  yesterdayCiro() {
    return this.ciroService.yesterdayCiro();
  }

  chartCiro() {
    return this.ciroService.chartCiro();
  }

  chartExpenses() {
    return this.expensesService.chartExpenses();
  }
}
