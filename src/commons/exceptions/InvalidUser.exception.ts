import { HttpException, HttpStatus } from "@nestjs/common";
import { error } from "console";


export class InvalidUserException extends HttpException{
    constructor(message = "Invalid user exception", data = {}){
        super(
            {
                message:message,
                statusCode: HttpStatus.BAD_REQUEST,
                error:{
                    type: "invalid_user_exception",
                    statusCode: HttpStatus.BAD_REQUEST,
                    message:message,
                }
            },
            HttpStatus.BAD_REQUEST
        );
    }
}