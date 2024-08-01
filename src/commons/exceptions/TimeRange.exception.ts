import { HttpException, HttpStatus } from "@nestjs/common";
import { error } from "console";


export class InvalidTimeRangeException extends HttpException{
    constructor(message = "Invalid time range exception", data = {}){
        super(
            {
                message:message,
                statusCode: HttpStatus.BAD_REQUEST,
                error:{
                    type: "invalid_time_range_exception",
                    statusCode: HttpStatus.BAD_REQUEST,
                    message:message,
                }
            },
            HttpStatus.BAD_REQUEST
        );
    }
}