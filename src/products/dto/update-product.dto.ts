import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  picture?: string;
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: string;
}
