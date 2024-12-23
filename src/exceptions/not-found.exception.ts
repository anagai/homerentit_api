import { HttpException, HttpStatus } from "@nestjs/common";
import { StatusResponse } from "../types/status-response.type";
import { Status } from "../constants";

export default class NotFoundException extends HttpException {
    constructor(msg: string | undefined=undefined) {
        const message = msg ?? "Record Not Found";
        const response: StatusResponse = {status: Status.FAILED, message: message};
        super(response, HttpStatus.NOT_FOUND)
    }
}