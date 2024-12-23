import { HttpException, HttpStatus } from "@nestjs/common";
import { StatusResponse } from "../types/status-response.type";
import { Status } from "../constants";

export default class BadRequestException extends HttpException {
    constructor(msg: string | undefined=undefined) {
        const message = msg ?? "Bad Request";
        const response: StatusResponse = {status: Status.FAILED, message: message};
        super(response, HttpStatus.BAD_REQUEST)
    }
}