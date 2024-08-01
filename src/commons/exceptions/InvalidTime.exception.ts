import { HttpException, HttpStatus } from "@nestjs/common";
import { error } from "console";


export class InvalidTimeException extends HttpException{
    constructor(message = "Invalid time exception", data = {}){
        super(
            {
                message:message,
                statusCode: HttpStatus.BAD_REQUEST,
                error:{
                    type: "invalid_time_exception",
                    statusCode: HttpStatus.BAD_REQUEST,
                    message:message,
                }
            },
            HttpStatus.BAD_REQUEST
        );
    }
}