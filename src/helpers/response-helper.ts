import { StatusResponse } from "src/types/status-response.type"
import { Status } from "src/constants";

export default class ResponseHelper {

    static successResponse() {
        const resp: StatusResponse = {status: Status.SUCCESS}
        return resp;
    }

    static failedResponse(message: string) {
        const resp: StatusResponse = {status: Status.SUCCESS, message: message}
        return resp;
    }
}