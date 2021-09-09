import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UsersModule } from 'src/users/users.module';
import { CiroModule } from 'src/ciro/ciro.module';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService],
  imports: [UsersModule, CiroModule, ExpensesModule, SettingsModule],
})
export class DashboardModule {}
