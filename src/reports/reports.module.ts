import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { CiroModule } from 'src/ciro/ciro.module';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports:[CiroModule,ExpensesModule,SettingsModule],
  controllers: [ReportsController],
  providers: [ReportsService]
})
export class ReportsModule {}
