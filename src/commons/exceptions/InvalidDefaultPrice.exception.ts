import { HttpException, HttpStatus } from "@nestjs/common";
import { error } from "console";


export class InvalidDefaultPriceException extends HttpException{
    constructor(message = "Invalid default price exception", data = {}){
        super(
            {
                message:message,
                statusCode: HttpStatus.BAD_REQUEST,
                error:{
                    type: "invalid_default_price_exception",
                    statusCode: HttpStatus.BAD_REQUEST,
                    message:message,
                }
            },
            HttpStatus.BAD_REQUEST
        );
    }
}