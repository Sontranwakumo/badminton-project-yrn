import { HttpException, HttpStatus } from "@nestjs/common";
import { error } from "console";


export class InvalidCourtException extends HttpException{
    constructor(message = "Invalid court exception", data = {}){
        super(
            {
                message:message,
                statusCode: HttpStatus.BAD_REQUEST,
                error:{
                    type: "invalid_court_exception",
                    statusCode: HttpStatus.BAD_REQUEST,
                    message:message,
                }
            },
            HttpStatus.BAD_REQUEST
        );
    }
}