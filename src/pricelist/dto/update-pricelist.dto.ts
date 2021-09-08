import { PartialType } from '@nestjs/mapped-types';
import { CreatePricelistDto } from './create-pricelist.dto';

export class UpdatePricelistDto extends PartialType(CreatePricelistDto) {
    readonly name: string
    readonly price: string
    readonly id: string
}
