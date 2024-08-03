import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderFormDto } from './create-order-form.dto.js';

export class UpdateOrderFormDto extends PartialType(CreateOrderFormDto) {}
