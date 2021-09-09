import { Module } from '@nestjs/common';
import { CiroService } from './ciro.service';
import { CiroController } from './ciro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/orm.config';
import { Ciro } from './entities/ciro.entity';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Ciro]),
    SettingsModule,
  ],
  controllers: [CiroController],
  providers: [CiroService],
  exports: [CiroService],
})
export class CiroModule {}
