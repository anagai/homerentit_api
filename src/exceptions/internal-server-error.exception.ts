import { HttpException, HttpStatus } from "@nestjs/common";
import { StatusResponse } from "../types/status-response.type";
import { Status } from "../constants";

export default class InternalServerErrorException extends HttpException {
    constructor(msg: string | undefined=undefined) {
        const message = msg ?? "Internal Server Error";
        const response: StatusResponse = {status: Status.FAILED, message: message};
        super(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}