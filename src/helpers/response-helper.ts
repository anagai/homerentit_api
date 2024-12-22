import { StatusResponse } from "src/types/status-response.type"

export default class ResponseHelper {

    static successResponse() {
        return { status: "Success", message: '' } as StatusResponse
    }

    static failedResponse(message: string) {
        return { status: "Failed", message: message} as StatusResponse
    }
}