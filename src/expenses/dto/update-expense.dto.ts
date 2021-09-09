import { PartialType } from '@nestjs/mapped-types';
import { Personnel } from 'src/personnel/entities/personnel.entity';
import { CreateExpenseDto } from './create-expense.dto';

export class UpdateExpenseDto extends PartialType(CreateExpenseDto) {
  readonly type: string;
  readonly description?: string;
  readonly personnel?: Personnel[];
  readonly date: string;
  readonly id: string;
}
