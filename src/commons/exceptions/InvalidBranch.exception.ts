import { HttpException, HttpStatus } from "@nestjs/common";
import { error } from "console";


export class InvalidBranchException extends HttpException{
    constructor(message = "Invalid branch exception", data = {}){
        super(
            {
                message:message,
                statusCode: HttpStatus.BAD_REQUEST,
                error:{
                    type: "invalid_branch_exception",
                    statusCode: HttpStatus.BAD_REQUEST,
                    message:message,
                }
            },
            HttpStatus.BAD_REQUEST
        );
    }
}