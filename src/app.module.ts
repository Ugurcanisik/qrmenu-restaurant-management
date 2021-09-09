import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { ProductsModule } from './products/products.module';
import { CiroModule } from './ciro/ciro.module';
import { ExpensesModule } from './expenses/expenses.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PricelistModule } from './pricelist/pricelist.module';
import { PersonnelModule } from './personnel/personnel.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    DashboardModule,
    CategoriesModule,
    ProductsModule,
    CiroModule,
    ExpensesModule,
    UsersModule,
    ReportsModule,
    AuthModule,
    PricelistModule,
    PersonnelModule,
    SettingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
