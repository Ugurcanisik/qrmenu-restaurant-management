import { Controller, Get, Res, Req } from '@nestjs/common';
import { DashboardService } from './dashboard.service';


@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  @Get()
  async index(@Res() res, @Req() req) {
    // console.log(req.user)
    res.render(
      'dashboard',
      {
        user: req.user,
        allSetting: await this.dashboardService.allSetting(),
        todayExpenses: await this.dashboardService.todayExpenses(),
        monthlyExpenses: await this.dashboardService.monthlyExpenses(),
        yesterdayCiro: await this.dashboardService.yesterdayCiro(),
        averangeCiro: await this.dashboardService.averangeCiro(),
        totalCiro : await this.dashboardService.totalCiro(),
        chartCiro: await this.dashboardService.chartCiro(),
        chartExpenses: await this.dashboardService.chartExpenses()
      }
      )
  }

}
