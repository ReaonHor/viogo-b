import { PartialType } from '@nestjs/mapped-types';
import { CreateVioDto } from './create-vio.dto';

export class UpdateVioDto extends PartialType(CreateVioDto) {}
