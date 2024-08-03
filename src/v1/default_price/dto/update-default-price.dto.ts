import {IsString,IsNumber} from 'class-validator'
export class UpdateDefaultPriceDto{
    @IsString()
    startTime: string;
    @IsString()
    endTime: string;
    @IsNumber()
    pricePerHour: number;
}

// json  => any

// objev => UpdateDefaultPriceDto