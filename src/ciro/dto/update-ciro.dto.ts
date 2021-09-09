import { PartialType } from '@nestjs/mapped-types';
import { CreateCiroDto } from './create-ciro.dto';

export class UpdateCiroDto extends PartialType(CreateCiroDto) {
  readonly total: number;
  readonly description?: string;
  readonly date: string;
  readonly id: string;
}
