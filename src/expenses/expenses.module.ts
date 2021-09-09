import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { TypeExpense } from './entities/type.expense.entity';
import { config } from 'src/orm.config';
import { PersonnelModule } from 'src/personnel/personnel.module';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Expense]),
    TypeOrmModule.forFeature([TypeExpense]),
    PersonnelModule,
    SettingsModule,
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [ExpensesService],
})
export class ExpensesModule {}
